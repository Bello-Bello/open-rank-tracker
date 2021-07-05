import jwt

from datetime import datetime
from sqlalchemy import func

from flask_restful import Resource
from flask import current_app as app
from flask import make_response, request, abort

from app.services.user import send_email
from app.serde.user import UserSchema
from app.models.user import User
from app import db


class SignUpView(Resource):
    def post(self):
        data = request.get_json()

        user = User.query.filter(
            func.lower(User.email) == data["email"].strip().lower()
        ).first()

        if user:
            abort(400, "This email address is already in use.")

        user = User()
        user.email = data["email"].strip()
        user.password = data["password"].strip()
        user.last_login = datetime.now()

        db.session.add(user)
        db.session.commit()

        send_email(
            user.email,
            "Account activation",
            "verify_email.html",
            root_domain=request.url_root,
            user_uuid=user.external_id,
        )

        response = make_response("")
        response.set_cookie(
            "user",
            jwt.encode(
                UserSchema().dump(user), app.config["SECRET_KEY"], algorithm="HS256"
            ),
        )

        return response
