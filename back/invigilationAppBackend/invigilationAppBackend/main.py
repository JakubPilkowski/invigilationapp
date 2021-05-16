from flask import Blueprint, request, make_response, jsonify, send_from_directory, safe_join
from app import db, app
from models import User, Status, Activity
from authorization import authorize
import json, random
main = Blueprint('main', __name__)



@main.route('/app/me', methods=["GET"])
def me():
    authorized = authorize()
    if authorized['result']:
        me = User.query.filter(User.id==authorized['user'].id).first()
        activities = Activity.query.filter(Activity.user_id==me.id).limit(10).all()
        response = {
            'status': 'success',
            'me': {
                'username': me.username,
                'email': me.email,
                'avatar': me.avatar,
                'status': {
                    'state': me.status.state,
                    'last_interaction_time': me.status.last_interaction_time
                },
                "activities": [
                    {
                        "page": activity.page,
                        "event": activity.event
                    } for activity in activities
                ] 
            }
        }
        return make_response(jsonify(response)), 200
    else:
        response = {
            'status': 'fail',
            'message': 'Unathorized request call'
        }
        return make_response(jsonify(response)), 403

@main.route('/app/users', methods=["GET"])
def users():
    authorized = authorize()
    if authorized['result']:
        users = User.query.filter(User.id!=authorized['user'].id).all()
        results = [
            {
                "username": user.username,
                "email": user.email,
                "avatar": user.avatar
                "status": {
                    "state": user.status.state,
                    "last_interaction_time": user.status.last_interaction_time
                }
            } for user in users
        ]
        response = {
            'status': 'success',
            'users': results
        }
        return make_response(jsonify(response)), 200
    else:
        response = {
            'status': 'fail',
            'message': 'Unathorized request call'
        }
        return make_response(jsonify(response)), 403


# @main.route('/app/status', methods=['PUT'])
# def changeStatus():
  

@main.route('/app/activity', methods=['POST'])
def addActivity():
    data = request.get_json()
    authorized = authorize()
    if authorized['result'] and data:
        activity = Activity(user_id = authorized['user'].id, event=data['event'], page=data['page'])
        db.session.add(activity)
        db.session.commit()
        response = {
            'status': 'success',
            'message': 'Added activity'
        }
        return make_response(jsonify(response)), 200

    elif not authorized['result']:
        resposne = {
            "status": "fail",
            "message": "authorization failed"
        }
        return make_response(jsonify(response)), 401
    elif not data:
        response = {
            "status": "fail",
            "message": "bad request"
        }
        return make_response(jsonify(response)), 400
    else:
        response = {
            "status": "fail",
            "message": "unexpected error"
        }
        return make_response(jsonify(response)), 500


@main.route('/app/activity/<username>', methods=['GET'])
def activities(username):
    authorized = authorize()
    if authorized['result']:
        user = User.query.filter(User.username==username).first()
        if user:
            activities = Activity.query.filter(Activity.user_id == user.id).limit(10).all()
            response = {
                'status': 'success',
                'activities' : [
                    {
                        'event' : activity.event,
                        'page': activity.page
                    } for activity in activities
                ]
            }
            return make_response(jsonify(response)), 200
        else:
            response = {
                'status': 'failed',
                'message': 'User not found'
            }
            return make_response(jsonify(response)), 404
    elif not authorized['result']:
        resposne = {
            "status": "fail",
            "message": "authorization failed"
        }
        return make_response(jsonify(response)), 401
    else:
        response = {
            "status": "fail",
            "message": "unexpected error"
        }
        return make_response(jsonify(response)), 500
