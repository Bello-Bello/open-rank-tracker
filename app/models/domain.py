from app import db


class Domain(db.Model):
    __tablename__ = "domain"

    id = db.Column(db.Integer, primary_key=True)
    domain = db.Column(db.String, nullable=False)
