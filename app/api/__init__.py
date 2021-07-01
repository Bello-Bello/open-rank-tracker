from flask import Blueprint
from flask_restful import Api

from app.api.users.signup import SignUpView
from app.api.users.login import LoginView

from app.api.keywords.scan_callback import ScanCallbackView


api_blueprint = Blueprint("main", __name__, url_prefix="/api")
api = Api(api_blueprint)

api.add_resource(SignUpView, "/users/signup/")
api.add_resource(LoginView, "/users/login/")

api.add_resource(ScanCallbackView, "/keywords/<int:keyword_id>/callback/")
