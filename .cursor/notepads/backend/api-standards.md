# API Design Standards

API actual: **FastAPI** en `backend/`, prefijo de routers por recurso (ej. `/products`). El proxy del frontend envía `/api` a `http://localhost:8000`.

## RESTful en este proyecto

### Productos (implementado)
- `GET /products/` — listar con filtros (category, min_price, max_price, search, limit, offset)
- `GET /products/{product_id}` — detalle
- `POST /products/` — crear (201)
- `PUT /products/{product_id}` — actualizar
- `DELETE /products/{product_id}` — eliminar

### General
- `GET /` — mensaje de bienvenida
- `GET /health` — health check

## Formato de respuesta objetivo
- **Éxito**: `{ "success": true, "data": {...} }` o lista directa cuando aplica (ej. listado de productos)
- **Error**: FastAPI `HTTPException`; objetivo unificar en `{ "success": false, "error": { "code": "...", "message": "..." } }` si se estandariza

## Códigos HTTP
- 200: GET, PUT exitosos
- 201: POST exitoso
- 204: DELETE exitoso (opcional)
- 400: Bad Request
- 404: Not Found
- 422: Validación (Pydantic)
- 500: Error interno

## Estructura del backend
- `backend/main.py` — app FastAPI, CORS, montaje de routers
- `backend/src/products/` — api.py, models.py, database.py
- `backend/src/shared/` — config.py, database.py (init DB)
- Nuevos dominios: crear carpeta bajo `src/` (ej. `src/orders/`) con api, models, database

## Validación
- Usar modelos Pydantic para request body y response_model
- Evitar `dict` en endpoints; definir schemas (CreateProduct, UpdateProduct, Product)
