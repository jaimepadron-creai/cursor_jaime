# ADR-003: API REST para Productos

## Status
**Aceptado** — Proyecto E-commerce Evolution

## Contexto
El backend expone un recurso principal inicial: **productos**. Se definió cómo estructurar rutas, respuestas y acceso a datos.

## Decisión
- Recurso **productos** bajo router con prefijo `/products`
- Endpoints: GET (list + detalle), POST, PUT, DELETE
- Listado con filtros opcionales: category, min_price, max_price, search, limit, offset
- Datos en SQLite; acceso vía módulo `src/products/database.py` (y shared)

## Justificación
- REST estándar facilita consumo desde frontend y documentación OpenAPI
- Filtros en query params permiten listado flexible sin muchos endpoints
- SQLite suficiente para aprendizaje y desarrollo; migrable a PostgreSQL después

## Consecuencias
- **Positivas**: API predecible, documentada por FastAPI
- **Negativas**: Código actual con queries raw y riesgos de SQL injection; objetivo migrar a ORM (SQLAlchemy) y Pydantic en request/response

## Implementación
- `backend/src/products/api.py` — router montado en main app
- `backend/src/products/models.py` — modelo Pydantic Product
- `backend/src/products/database.py` — funciones de acceso a BD
- Frontend: proxy `/api` → `http://localhost:8000`; llamadas a `/api/products` etc.

**Revisión**: Introducir schemas Pydantic para request (CreateProduct, UpdateProduct), eliminar concatenación de SQL, valorar soft delete.
