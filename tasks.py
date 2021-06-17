from app import create_app, init_app, celery


if __name__ == "__main__":
    app = create_app()
    init_app(app)

    celery.start()
