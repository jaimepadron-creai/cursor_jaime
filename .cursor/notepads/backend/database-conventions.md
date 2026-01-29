# Database Conventions

## Stack actual
- Backend usa SQLite vía `src/shared/database.py` (init_db) y acceso por dominio en `src/products/database.py`
- Sin ORM en el código actual; queries raw. Objetivo a medio plazo: SQLAlchemy + migraciones (Alembic) si se escala

## Nomenclatura (objetivo)
- Tablas: plural, snake_case (`products`, `orders`, `order_items`)
- Columnas: snake_case (`created_at`, `product_id`, `is_active`)
- Claves foráneas: `{tabla_singular}_id`

## Tabla `products` (existente)
- Campos típicos: id, name, price, stock, category, description, is_active
- Timestamps: añadir `created_at`, `updated_at` si se refactoriza

## Buenas prácticas
- No concatenar strings para SQL; usar parámetros (?) o ORM
- Transacciones para operaciones multi-tabla
- Soft delete con `is_active=False` en lugar de DELETE cuando haya historial
