import logging

from flask import make_response, g, abort
from flask_restful import Resource, wraps

from app.models.user import User


def require_login(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if "id" not in g.cookie:
            logging.warning("No authorization provided!")
            abort(401)

        g.user = None

        if "id" in g.cookie:
            g.user = User.query.get(g.cookie["id"])

        if not g.user:
            response = make_response("", 401)
            response.set_cookie("user", "")
            return response

        return func(*args, **kwargs)

    return wrapper


class AuthenticatedView(Resource):
    method_decorators = [require_login]
