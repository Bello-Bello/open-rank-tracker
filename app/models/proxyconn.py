from app import db


class ProxyConnection(db.Model):
    __tablename__ = "proxyconn"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    proxy_url = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    # Can this proxy support multiple parallel requests?
    allow_parallel = db.Column(
        db.Boolean, default=False, server_default="f", nullable=False
    )

    success_count = db.Column(db.Integer, default=0, server_default="0")
    block_count = db.Column(db.Integer, default=0, server_default="0")
    no_result_count = db.Column(db.Integer, default=0, server_default="0")
    consecutive_fails = db.Column(db.Integer, default=0, server_default="0")

    # Proxy is currently in use (only applicable when allow_parallel = 'f').
    engaged = db.Column(db.Boolean, default=False, server_default="f")

    # Must wait at least this long before allowing another request.
    min_wait_time = db.Column(db.Integer, default=0, server_default="0", nullable=False)

    # Use random delay when proxying with a static IP to avoid blocks.
    random_delay = db.Column(db.Integer, default=0, server_default="0", nullable=False)

    last_used = db.Column(db.DateTime, index=True, nullable=True)

    user = db.relationship("User")
