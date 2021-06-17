from werkzeug.middleware.proxy_fix import ProxyFix
from app import create_app, init_app

application = create_app()
init_app(application)

if __name__ == "__main__":
    application.wsgi_app = ProxyFix(app.wsgi_app, x_num=0, x_proto=1)
    application.run()
