"""
Middleware de performance (Módulo 5).
Mide tiempo de request y añade header X-Process-Time.
"""
import time
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

logger = logging.getLogger(__name__)


class PerformanceMiddleware(BaseHTTPMiddleware):
    """Middleware para medir tiempo de procesamiento de requests (Módulo 5)."""

    async def dispatch(self, request: Request, call_next) -> Response:
        start_time = time.time()
        response: Response = await call_next(request)
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = f"{process_time:.4f}"
        logger.info(
            "%s %s - %s - %.4fs",
            request.method,
            request.url.path,
            response.status_code,
            process_time,
        )
        if process_time > 1.0:
            logger.warning(
                "Slow request: %s %s - %.4fs",
                request.method,
                request.url.path,
                process_time,
            )
        return response
