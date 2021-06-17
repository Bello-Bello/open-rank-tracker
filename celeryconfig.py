from app.util import create_db_uri

broker_url = "redis://redis:6379/0"
result_backend = "redis://redis:6379/0"

imports = ("app.tasks",)

beat_schedule = {
    "auto-scan-keywords": {"task": "app.tasks.auto_scan_keywords", "schedule": 30}
}
