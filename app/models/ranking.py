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
