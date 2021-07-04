import os
import requests

from flask import current_app as app
from flask import render_template


def verify_email(to):
    return requests.get(
        "https://api.mailgun.net/v4/address/validate",
        auth=("api", app.config["MAILGUN_API_KEY"]),
        params={"address": to},
    )


def send_email(to, subject, template, **kwargs):
    rendered = render_template(template, **kwargs)

    response = requests.post(
        "https://api.mailgun.net/v3/{}/messages".format(app.config["MAIL_DOMAIN"]),
        auth=("api", app.config["MAILGUN_API_KEY"]),
        data={
            "from": app.config["MAIL_SENDER"],
            "to": to,
            "subject": app.config["MAIL_SUBJECT_PREFIX"] + " " + subject,
            "html": rendered,
        },
    )

    return response.status_code == 201
