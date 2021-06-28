from logging.config import dictConfig
import uuid
import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from celery import Celery
import celeryconfig

from app.util import create_db_uri, create_testing_db_uri

db = SQLAlchemy()

celery = Celery()
celery.config_from_object(celeryconfig)

dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
            }
        },
        "handlers": {
            "wsgi": {
                "class": "logging.StreamHandler",
                "stream": "ext://flask.logging.wsgi_errors_stream",
                "formatter": "default",
            }
        },
        "root": {"level": "DEBUG", "handlers": ["wsgi"]},
    }
)


def init_app(app):
    db.init_app(app)

    from app.api import api_blueprint

    app.register_blueprint(api_blueprint)

    return app


def create_celery(app):
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = create_db_uri()
    app.config["SQLALCHEMY_POOL_RECYCLE"] = int(
        os.environ.get("SQLALCHEMY_POOL_RECYCLE", 300)
    )

    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "placeholder_key")
    app.config["SQLALCHEMY_ECHO"] = True

    create_celery(app)
    return app


from app.models import *  # noqa
