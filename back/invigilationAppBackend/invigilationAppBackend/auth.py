from flask import request, Blueprint, make_response, jsonify
from app import db, app
from models import User, Status
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import UUID
from flask_cors import cross_origin
import datetime, jwt

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
@cross_origin()
def register():
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user:
            response = {
                'status': 'fail',
                'message': 'User already exists'
                }
            return make_response(jsonify(response)),202
        try:
            user = User(username=data['username'],
                    email=data['email'], password=generate_password_hash(data['password'], method='sha256'))
            status = Status(state="ACTIVE", last_interaction=datetime.datetime.now())
            user.status = status
            db.session.add(user)
            db.session.add(status)
            db.session.commit()
            auth_token = encode_auth_token(user.id)
            response = {
                'status':'success',
                'message': 'Successfully registered',
                'id': user.user_id(),
                'auth_token': auth_token.decode(encoding='UTF-8')
            }
            return make_response(jsonify(response)), 201
        except Exception as e:
            print(e)
            response = {
                'status': 'fail',
                # 'message': e
            }
            return make_response(jsonify(response)), 401


@auth.route('/login', methods=["POST"])
@cross_origin()
def login():
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()

        if not user or not check_password_hash(user.password, data['password']): 
            response = {
                'status': 'fail',
                'message': 'Check your login credentials'
            }
            return make_response(jsonify(response)), 401
        try:
            auth_token = encode_auth_token(user.id)
            response = {
                'status':'success',
                'message': 'Successfully logged in',
                'id': user.user_id(),
                'auth_token': auth_token.decode(encoding='UTF-8')
            }
            return make_response(jsonify(response)), 200
        except Exception as e:
            response = {
                'status': 'System error',
                'message': 'Try again'
            }
            return make_response(jsonify(response)), 500

@auth.route('/isLogged', methods=["POST"])
@cross_origin()
def isLogged():
    auth_token = request.headers.get('Authorization')
    if auth_token:
        resp = decode_auth_token(auth_token)
        if isinstance(resp, str) and User.query.filter_by(id=resp).first():
            response = {
                'status': 'success'
            }
            return make_response(jsonify(response)), 200
        else: 
            response = {
                'status': 'fail',
                'message': 'Unathorized request call'
            }
            return make_response(jsonify(response)), 403
    else: 
        response = {
            'status': 'fail',
            'message': 'Unathorized request call'
        }
        return make_response(jsonify(response)), 403

def encode_auth_token(user_id):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow(),
            'sub': str(user_id)
        }
        print(payload)
        return jwt.encode(
            payload,
            app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'