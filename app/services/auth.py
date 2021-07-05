import os
import json
import logging
import requests
import jwt

from oauthlib.oauth2 import WebApplicationClient
from flask import current_app as app
from flask import g, request, abort


def decode_cookie():
    cookie = request.cookies.get("user")

    if not cookie:
        g.cookie = {}
        return

    try:
        g.cookie = jwt.decode(cookie, os.environ["SECRET_KEY"], algorithms=["HS256"])
    except jwt.InvalidTokenError as err:
        logging.warning(str(err))
        abort(401)


def get_google_provider_cfg():
    return requests.get(
        "https://accounts.google.com/.well-known/openid-configuration"
    ).json()


def oauth2_request_uri(redirect_uri):
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    client = WebApplicationClient(app.config["GOOGLE_CLIENT_ID"])

    return client.prepare_request_uri(
        authorization_endpoint,
        redirect_uri=redirect_uri,
        scope=["openid", "email", "profile"],
    )


def get_user_info(oauth_code):
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    client = WebApplicationClient(app.config["GOOGLE_CLIENT_ID"])

    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=oauth_code,
    )

    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(app.config["GOOGLE_CLIENT_ID"], app.config["GOOGLE_CLIENT_SECRET"]),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    return userinfo_response.json()
