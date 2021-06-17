from app import db

class Keyword(db.Model):
    __tablename__ = "keyword"

    id = db.Column(db.Integer, primary_key=True)
    keyword = db.Column(db.String, nullable=False)
    last_scan = db.Column(db.DateTime, index=True, nullable=True)
    scan_interval = db.Column(db.Integer, default=604800, nullable=False)
