from app.models.keyword import Keyword
from app import db


class Ranking(db.Model):
    __tablename__ = "ranking"

    id = db.Column(db.Integer, primary_key=True)

    keyword_id = db.Column(
        db.Integer,
        db.ForeignKey("keyword.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    position = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String, nullable=False)

    keyword = db.relationship(
        Keyword,
        backref=db.backref(
            "rankings", order_by="Ranking.position", cascade="delete-orphan,all"
        ),
    )
