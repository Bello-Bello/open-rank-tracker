import jwt
from datetime import datetime

from flask import current_app as app
from flask import request, abort, make_response
from flask_restful import Resource

from app.models.user import User
from app.serde.user import UserSchema
from app import db


class LoginView(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data["email"].strip()).first()

        if not user:
            abort(401, "Username or password is incorrect.")

        if not user.verify_password(data["password"].strip()):
            abort(401, "Username or password is incorrect.")

        user.last_login = datetime.now()

        db.session.add(user)
        db.session.commit()

        response = make_response("")
        response.set_cookie(
            "user",
            jwt.encode(
                UserSchema().dump(user), app.config["SECRET_KEY"], algorithm="HS256"
            ),
        )

        return response
