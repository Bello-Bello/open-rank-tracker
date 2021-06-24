from urllib.parse import urlparse
from datetime import datetime

import docker
from flask import current_app as app

from app.models.proxyconn import ProxyConnection
from app.models.keyword import Keyword
from app import celery, db


@celery.task
def scan_keyword_async(proxyconn_id, keyword_id):
    proxyconn = ProxyConnection.query.get(proxyconn_id)
    keyword = Keyword.query.get(keyword_id)

    dclient = docker.client.DockerClient("unix:///var/run/docker.sock")

    app.logger.info(
        "Launching keyword scan (%s) on proxy ID (%s)", keyword_id, proxyconn_id
    )

    agent_container = dclient.containers.create(
        "open-rank-tracker-agent",
        "node search.js",
        environment={
            "SECRET_KEY": app.config["SECRET_KEY"],
            "KEYWORD_ID": keyword.id,
            "PROXY_ID": proxyconn.id,
            "PROXY_URL": proxyconn.proxy_url,
            "USERNAME": proxyconn.username,
            "PASSWORD": proxyconn.password,
            "KEYWORD": keyword.keyword,
        },
    )

    agent_container.start()
    agent_container.wait()

    app.logger.info("Scan finished")

    proxyconn.engaged = False

    db.session.add_all((proxyconn, keyword))
    db.session.commit()


def scan_keyword(proxyconn, keyword):
    if not proxyconn.allow_parallel:
        proxyconn.engaged = True

    proxyconn.last_used = datetime.utcnow()
    proxyconn.usage_count += 1

    keyword.scanning = True

    db.session.add_all((proxyconn, keyword))
    db.session.commit()

    app.logger.info("Queueing scan for keyword (%s)", keyword.id)

    scan_keyword_async.delay(proxyconn.id, keyword.id)


@celery.task
def handle_scraper_response(keyword_id, data):
    proxyconn = ProxyConnection.query.get(data["proxy_id"])
    keyword = Keyword.query.get(keyword_id)

    proxyconn.consecutive_fails += int(bool(data["blocked"] or data["error"]))
    app.logger.info(data)

    if data["blocked"]:
        proxyconn.block_count += 1
    elif data["error"]:
        app.logger.info(data["error"])
    else:
        keyword.last_scan = datetime.utcnow()
        proxyconn.consecutive_fails = 0

    root_domain = keyword.domain.domain
    print(root_domain)
    for url in data["results"]:
        parsed_url = urlparse(url)
        print(parsed_url.netloc)
        if root_domain == parsed_url.netloc:
            print("FOUND IT")

    keyword.scanning = False

    db.session.add_all((proxyconn, keyword))
    db.session.commit()
