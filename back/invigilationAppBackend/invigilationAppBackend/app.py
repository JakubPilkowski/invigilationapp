from flask import Flask, render_template, session, copy_current_request_context, request
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_socketio import SocketIO, emit, disconnect, send
from flask_cors import cross_origin, CORS
from threading import Lock
import time

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "http://localhost:8080"}})
app.config.from_object('config.DevelopmentConfig')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:8080")

from models import User, Status, Activity

from auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from authorization import authorize



@socketio.on('connect')
def handle_connection():
    authorized = authorize(request.args['token'])
    if authorized['result']:
        status = Status.query.filter(Status.user_id==authorized['user'].id).first()
        status.state = "ACTIVE"
        db.session.commit()


@socketio.on('disconnect')
def handle_disconnection():
    print('disconnect')
    print(resp)
    authorized = authorize(request.args['token'])
    if authorized['result']:
        status = Status.query.filter(Status.user_id==authorized['user'].id).first()
        status.state = "OFFLINE"
        db.session.commit()
        user = User.query.filter(User.id==authorized['user'].id).first()
        result = {
        "id": user.user_id(),
        "status": {
            'state': user.status.state,
            'lastInteraction': user.status.last_interaction.__str__()
        }                
        } 
        emit('change_status', results)

@socketio.on('users')
def handleShowUsers(resp):
    users = User.query.filter(User.id!=resp).all()
    results = [
        {
            "id": user.user_id(),
            "username": user.username,
            "email": user.email,
            "avatar": user.avatar,
            "status": {
                'state': user.status.state,
                'lastInteraction': user.status.last_interaction.__str__()
            }                
        } for user in users
    ]
    emit('get_users', results)

@socketio.on('status') 
def handle_state(resp):
    print('status')
    print(resp)
    status = Status.query.filter(Status.user_id==resp['userId']).first()
    status.last_interaction = resp['date']
    db.session.commit()
    users = User.query.filter(User.id!=resp).all()
    results = [
        {
            "id": user.user_id(),
            "username": user.username,
            "email": user.email,
            "avatar": user.avatar,
            "status": {
                'state': user.status.state,
                'lastInteraction': user.status.last_interaction.__str__()
            }                
        } for user in users
    ]
    emit('get_users', results)
   
@socketio.on('activity')
def handle_json(resp):
    print('activity')
    print(resp)
    activity = Activity(user_id = resp['userId'], event=resp['event'], page=resp['page'], event_date=resp['eventDate'])
    db.session.add(activity)
    db.session.commit()
    response = {
        'id': activity.id.__str__(),
        'event' : activity.event,
        'page': activity.page,
        'eventDate': activity.event_date.__str__()
    }
    emit('add_activity', response)

@socketio.on("activities")
def handleShowActivities(resp):
    activities = Activity.query.filter(Activity.user_id == resp).order_by(Activity.event_date.desc()).limit(20).all()
    response =  [
        {
            'id': activity.id.__str__(),
            'userId': activity.user_id.__str__(),
            'event' : activity.event,
            'page': activity.page,
            'eventDate': activity.event_date.__str__()
        } for activity in activities
    ]
    emit('get_activities', response)


if __name__ == "__main__":
    manager.run()
    socketio.run(app)
