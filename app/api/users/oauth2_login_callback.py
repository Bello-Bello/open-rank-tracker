import jwt

from datetime import datetime
from sqlalchemy import func, or_

from flask import request, redirect
from flask import current_app as app
from flask_restful import Resource

from app.services.auth import get_user_info
from app.models.user import User
from app.serde.user import UserSchema

from app import db


class Oauth2LoginCallbackView(Resource):
    """
    This is the Oauth (Google) login flow callback.

    When a user tries to sign in with an unknown Google ID they will
    be directed to go to the signup page instead.
    """

    def get(self):
        oauth_code = request.args.get("code")

        userinfo = get_user_info(oauth_code)
        google_id = userinfo["sub"]

        # Find existing authenticated Google ID or an existing email that the
        # user previously signed up with (they're logging in via Google for
        # the first time).
        user = User.query.filter(
            or_(
                User.google_id == google_id,
                func.lower(User.email) == userinfo["email"].lower(),
            )
        ).first()

        if not user:
            return redirect(request.url_root + "welcome/oauth/unknown")

        # The only possible way we should be altering a user Google ID is if
        # this is the first time they are logging in with G while using the
        # same address they used during non-oauth signup.
        if not user.google_id:
            user.google_id = google_id
            user.given_name = userinfo["given_name"]
            user.email = userinfo["email"]

        user.last_login = datetime.now()
        db.session.add(user)
        db.session.commit()

        response = redirect(request.url_root)
        response.set_cookie(
            "user",
            jwt.encode(
                UserSchema().dump(user), app.config["SECRET_KEY"], algorithm="HS256"
            ),
        )

        return response
