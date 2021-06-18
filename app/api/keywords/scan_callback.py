import logging

from flask import request, abort
from flask import current_app as app

from flask_restful import Resource
from app.services.keyword import handle_scraper_response


class ScanCallbackView(Resource):
    def post(self, keyword_id):
        data = request.get_json()

        app.logger.debug("Keyword scan callback initiated")

        if data.get("secret_key") != app.config["SECRET_KEY"]:
            logging.warning(
                "Scan callback did not provide correct secret key: {}".format(
                    data.get("secret_key")
                )
            )
            abort(403)

        handle_scraper_response.delay(keyword_id, data)
        return "", 201
