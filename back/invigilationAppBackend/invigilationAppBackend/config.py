class Config(object):
    ENVIRONMENT = "Production"
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = False
    UPLOAD_FOLDER = './static'
    SECRET_KEY = 'QkWRTTc35hjFCRYs'
    SQLALCHEMY_DATABASE_URI = "postgresql://invigilationappadmin:2DVetWjJg5st@localhost:5432/invigilationapp"


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
