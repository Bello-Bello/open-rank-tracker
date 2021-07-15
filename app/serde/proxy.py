from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from app.models.proxyconn import ProxyConnection


class ProxySchema(SQLAlchemyAutoSchema):

    class Meta:
        model = ProxyConnection
        load_instance = True

    # Set password to load_only so that it is accepted during form
    # submissions, but never dumped back into JSON format.
    password = auto_field(load_only=True)
