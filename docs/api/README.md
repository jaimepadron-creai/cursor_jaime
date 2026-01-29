# API Documentation (Módulo 7)

## Backend API (FastAPI)

- **Base URL (desarrollo)**: `http://localhost:8000`
- **Documentación interactiva**: `http://localhost:8000/docs` (Swagger UI)
- **ReDoc**: `http://localhost:8000/redoc` (si está habilitado)

## Endpoints principales

### Productos
- `GET /products/` — Listar productos (filtros: category, min_price, max_price, search, limit, offset)
- `GET /products/{id}` — Detalle de producto
- `POST /products/` — Crear producto (body: name, price, stock, category, description)
- `PUT /products/{id}` — Actualizar producto
- `DELETE /products/{id}` — Eliminar producto

### General
- `GET /` — Mensaje de bienvenida
- `GET /health` — Health check

## Formato de respuesta

- **Éxito**: `{ "success": true, "data": {...} }` o lista directa según endpoint
- **Error**: FastAPI HTTPException; objetivo unificar en `{ "success": false, "error": { "code": "...", "message": "..." } }`

## Autenticación

Cuando esté implementada: header `Authorization: Bearer <token>`.
