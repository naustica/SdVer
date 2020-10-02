import os


class BaseConfig:
    ENV = 'production'
    DEBUG = False
    TESTING = False
    HOST = '0.0.0.0'
    SECRET_KEY = os.environ['SECRET_KEY']


class DevelopementConfig(BaseConfig):
    ENV = 'development'
    DEBUG = True
    DEVELOPMENT = True


class TestingConfig(BaseConfig):
    TESTING = True


class ProductionConfig(BaseConfig):
    pass
