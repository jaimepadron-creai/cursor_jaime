"""
Configuración de logging (Módulo 5 - structured logging).
Formatter JSON para producción y formato legible para desarrollo.
"""
import logging
import json
from datetime import datetime
from typing import Any, Dict


class JSONFormatter(logging.Formatter):
    """Formatter para logs en formato JSON (Módulo 5)."""

    def format(self, record: logging.LogRecord) -> str:
        log_entry: Dict[str, Any] = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        if hasattr(record, "user_id"):
            log_entry["user_id"] = record.user_id
        if hasattr(record, "request_id"):
            log_entry["request_id"] = record.request_id
        if hasattr(record, "execution_time"):
            log_entry["execution_time"] = record.execution_time
        return json.dumps(log_entry, ensure_ascii=False)


def setup_logging(environment: str = "development") -> None:
    """Configura el sistema de logging."""
    if environment == "production":
        formatter = JSONFormatter()
    else:
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)
    root = logging.getLogger()
    root.setLevel(logging.DEBUG if environment == "development" else logging.INFO)
    root.handlers.clear()
    root.addHandler(handler)
