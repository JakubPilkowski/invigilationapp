from models import User
from auth import decode_auth_token

def authorize(token):
    if token:
        resp = decode_auth_token(token)
        if isinstance(resp, str):
            user = User.query.filter_by(id=resp).first()
            return {'result': True, 'user': user}
        else: 
            return {'result': False}
    else: 
        return {'result': False}
