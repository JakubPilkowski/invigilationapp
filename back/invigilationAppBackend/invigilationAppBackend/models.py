from app import db
from enum import Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid, random


class State(str, Enum):
    ACTIVE = 'Aktywny',
    OFFLINE = 'Offline'

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    avatar = db.Column(db.String())
    status = db.relationship('Status', backref='user', uselist=False)
    activities = db.relationship('Activity', backref='user', lazy=True)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        number = random.randint(1,3)
        self.avatar = '/static/avatar{}.png'.format(number)

    def user_id(self):
        return self.id.__str__()

    def __repr__(self):
        return '<username {}>'.format(self.username)


class Status(db.Model):
    __tablename__ = 'statuses'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'users.id'), nullable=False)
    state = db.Column(db.Enum(State), nullable=False)
    last_interaction = db.Column(db.DateTime(timezone=True), nullable=False)

    def __init__(self, state, last_interaction):
        self.state = state
        self.last_interaction = last_interaction

    def __repr__(self):
        return '<id {}>'.format(self.id)


class Activity(db.Model):
    __tablename__ = 'activities'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'users.id'), nullable=False)
    event = db.Column(db.String(100), nullable=False)
    page = db.Column(db.String(40), nullable=False)
    event_date = db.Column(db.DateTime(timezone=True), nullable = False)

    def __init__(self, user_id, event, page, event_date):
        self.user_id = user_id
        self.event = event
        self.page = page
        self.event_date = event_date

    def __repr__(self):
        return '<id {}>'.format(self.id)