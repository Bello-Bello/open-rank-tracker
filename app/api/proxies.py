from flask import request, g, abort
from marshmallow import ValidationError

from app.api.auth import AuthenticatedView
from app.models.proxyconn import ProxyConnection
from app.serde.proxy import ProxySchema
from app import db


class ProxiesView(AuthenticatedView):
    def get(self):
        return (
            ProxySchema().dump(
                ProxyConnection.query.filter_by(user_id=g.user.id)
                .order_by(ProxyConnection.id)
                .all(),
                many=True,
            ),
            200,
        )

    def post(self):
        try:
            proxy = ProxySchema().load(request.get_json(), session=db.session)
            proxy.user = g.user
        except ValidationError:
            abort(400)

        db.session.add(proxy)
        db.session.commit()

        return ProxySchema().dump(proxy), 201
