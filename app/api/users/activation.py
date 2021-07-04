import jwt

from flask_restful import Resource
from flask import current_app as app
from flask import make_response, request, abort

from app.serde.user import UserSchema
from app.models.user import User
from app import db


class ActivationView(Resource):
    def post(self):
        data = request.get_json()

        user = User.query.filter(User.external_id == data["user_uuid"].strip()).first()

        if not user:
            abort(400, "Can't find user associated with activation code.")

        user.activated = True

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
