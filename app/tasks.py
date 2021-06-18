from datetime import datetime
from random import randint

from flask import current_app as app

from sqlalchemy import extract, or_
from app import celery

from app.models.proxyconn import ProxyConnection
from app.models.keyword import Keyword
from app import db

from app.services.keyword import scan_keyword


@celery.task
def auto_scan_keywords():
    elapsed = (
        extract("epoch", datetime.utcnow())
        - extract("epoch", Keyword.last_scan)  # noqa
    ).label("elapsed")

    proxies = ProxyConnection.query.order_by(ProxyConnection.usage_count).all()

    for keyword in Keyword.query.filter(
        Keyword.scanning.is_(False),
        or_(Keyword.last_scan.is_(None), elapsed > Keyword.scan_interval),
    ):
        for proxy in proxies:
            if proxy.engaged:
                continue

            if proxy.allow_parallel:
                scan_keyword(proxy, keyword)
                break

            ready = (
                (
                    (datetime.utcnow() - proxy.last_used).total_seconds()
                    > proxy.min_wait_time + randint(0, proxy.random_delay)
                )
                if proxy.last_used
                else True
            )

            if ready:
                scan_keyword(proxy, keyword)
                break
        else:
            app.logger.info("No proxy connections available.")
