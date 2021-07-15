from flask import g, abort

from app.api.auth import AuthenticatedView
from app.models.proxyconn import ProxyConnection
from app import db


class ProxyView(AuthenticatedView):
    def delete(self, proxy_id):
        proxy = ProxyConnection.query.get(proxy_id)

        if proxy.user_id != g.user.id:
            abort(403)

        db.session.delete(proxy)
        db.session.commit()

        return "", 200
