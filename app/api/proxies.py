from flask import request, abort
from marshmallow import ValidationError

from app.api.auth import AuthenticatedView
from app.serde.proxy import ProxySchema
from app import db


class ProxiesView(AuthenticatedView):
    def post(self):
        try:
            proxy = ProxySchema().load(request.get_json(), session=db.session)
        except ValidationError:
            abort(400)

        db.session.add(proxy)
        db.session.commit()

        return ProxySchema().dump(proxy), 201
