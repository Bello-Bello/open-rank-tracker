from datetime import datetime
import docker

from sqlalchemy import func, extract
from app import celery


@celery.task
def auto_scan_keywords():
    elapsed = (
        extract("epoch", datetime.utcnow()) - extract("epoch", Keyword.last_scan)
    ).label("elapsed")
