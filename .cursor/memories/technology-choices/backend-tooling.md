# Technology Choices — Backend Tooling

## Framework: FastAPI
- FastAPI para API REST
- Uvicorn como servidor ASGI
- Documentación OpenAPI automática en `/docs`, `/redoc`

## Validación y datos: Pydantic
- Pydantic v2 para modelos de request/response
- Objetivo: usar schemas en todos los endpoints (evitar dict)
- python-multipart para form/data cuando aplique

## Base de datos (actual)
- SQLite vía módulos en `src/shared/database.py` y por dominio
- Sin ORM en código actual; queries raw
- Objetivo a medio plazo: SQLAlchemy + Alembic para migraciones y seguridad

## Servidor
- uvicorn con reload en desarrollo
- Ejecución: `python main.py` o `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
