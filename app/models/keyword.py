from app.models.domain import Domain
from app import db


class Keyword(db.Model):
    __tablename__ = "keyword"

    id = db.Column(db.Integer, primary_key=True)

    domain_id = db.Column(
        db.Integer,
        db.ForeignKey("domain.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    keyword = db.Column(db.String, nullable=False)
    last_scan = db.Column(db.DateTime, index=True, nullable=True)
    scan_interval = db.Column(db.Integer, default=604800, nullable=False)

    scanning = db.Column(db.Boolean, default=False, server_default="f")

    domain = db.relationship(
        Domain,
        backref=db.backref(
            "keywords", order_by="Keyword.keyword", cascade="delete-orphan,all"
        ),
    )
