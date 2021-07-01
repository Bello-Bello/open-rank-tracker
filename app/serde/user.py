from marshmallow import Schema, fields


class UserSchema(Schema):
    id = fields.Int()
    google_id = fields.Str()
    given_name = fields.Str()
    picture = fields.Str()
    email = fields.Str()
