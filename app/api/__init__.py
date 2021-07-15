from flask import Blueprint
from flask_restful import Api

from app.api.users.oauth2signup import Oauth2SignUpView
from app.api.users.oauth2login import Oauth2LoginView
from app.api.users.oauth2_signup_callback import Oauth2SignUpCallbackView
from app.api.users.oauth2_login_callback import Oauth2LoginCallbackView
from app.api.users.activation import ActivationView
from app.api.users.signup import SignUpView
from app.api.users.login import LoginView

from app.api.proxy import ProxyView
from app.api.proxies import ProxiesView
from app.api.keywords.scan_callback import ScanCallbackView


api_blueprint = Blueprint("main", __name__, url_prefix="/api")
api = Api(api_blueprint)

api.add_resource(Oauth2LoginView, "/users/oauth2login/")
api.add_resource(Oauth2SignUpView, "/users/oauth2signup/")
api.add_resource(Oauth2SignUpCallbackView, "/users/oauth2callback/signup/")
api.add_resource(Oauth2LoginCallbackView, "/users/oauth2callback/login/")
api.add_resource(ActivationView, "/users/activate/")
api.add_resource(SignUpView, "/users/signup/")
api.add_resource(LoginView, "/users/login/")

api.add_resource(ProxyView, "/proxies/<int:proxy_id>/")
api.add_resource(ProxiesView, "/proxies/")
api.add_resource(ScanCallbackView, "/keywords/<int:keyword_id>/callback/")
