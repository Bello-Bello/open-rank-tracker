import os


def create_db_uri():
    pguser = os.environ.get("POSTGRES_USER", "")
    pgpass = os.environ.get("POSTGRES_PASSWORD", "")
    pghost = os.environ.get("POSTGRES_HOST", "")
    pgdb = os.environ.get("POSTGRES_DB", "")

    return "postgresql://{}:{}@{}/{}".format(pguser, pgpass, pghost, pgdb)


def create_testing_db_uri():
    return "sqlite:///:memory:"
