from flask import request, redirect
from flask_restful import Resource

from app.services.auth import oauth2_request_uri


class Oauth2SignUpView(Resource):
    def post(self):
        return redirect(
            oauth2_request_uri(request.url_root + "api/users/oauth2callback/signup/")
        )
