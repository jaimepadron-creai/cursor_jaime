# Arquitectura Backend (Módulo 5) — Clean Architecture

## Resumen del Módulo 5

**Tema:** Desarrollo backend con Cursor AI: Clean Architecture, FastAPI, BD, JWT, testing y monitoring.

**Objetivos:** Separar capas (Domain, Application, Infrastructure), APIs REST con validación, repositorios con queries parametrizadas, JWT + bcrypt, pytest y logging estructurado.

---

## Estructura Clean Architecture (implementada)

```
backend/src/
├── products/
│   ├── domain/
│   │   ├── models/
│   │   │   └── product.py          # Entidad Product (dataclass, reglas de negocio)
│   │   └── interfaces/
│   │       └── repositories.py     # IProductRepository (abstract)
│   ├── application/
│   │   ├── create_product.py       # CreateProductUseCase
│   │   ├── get_products.py        # GetProductsUseCase, GetProductByIdUseCase
│   │   ├── update_product.py      # UpdateProductUseCase
│   │   └── delete_product.py      # DeleteProductUseCase
│   ├── infrastructure/
│   │   ├── api/
│   │   │   └── schemas.py         # ProductCreate, ProductUpdate, ProductResponse (Pydantic)
│   │   └── db/
│   │       └── repositories/
│   │           └── product_repository.py  # SQLiteProductRepository (sync, parametrizado)
│   └── executions.py              # ProductContainer (DI)
├── shared/
│   ├── settings.py                # Pydantic Settings (Módulo 5)
│   ├── config.py                  # Legacy (se puede migrar a settings)
│   ├── database.py                # get_connection, init_db
│   ├── logging_config.py         # JSONFormatter, setup_logging
│   ├── services/
│   │   └── jwt_service.py         # JWT + bcrypt (create_token, verify_token, hash/verify password)
│   └── middleware/
│       ├── auth.py                # get_current_user, require_role
│       └── performance.py         # PerformanceMiddleware (X-Process-Time)
└── main.py                        # FastAPI app (aún usa api.py legacy; siguiente paso: conectar use cases)
```

## Regla de dependencias

- **Infrastructure → Application → Domain**
- Domain no depende de nadie (solo tipos y reglas).
- Application depende de interfaces (IProductRepository), no de implementaciones.
- Infrastructure implementa repositorios y expone API (FastAPI).

## Uso del container (executions)

```python
from src.products.executions import product_container

# En un endpoint FastAPI (cuando se migre api.py):
products = product_container.get_products_use_case.execute(skip=0, limit=20, category="Electronics")
created = product_container.create_product_use_case.execute(name="X", price=..., ...)
```

## Siguiente paso: conectar API a use cases

- Sustituir en `src/products/api.py` las llamadas directas a `database.py` por llamadas a `product_container.*_use_case.execute(...)`.
- Mapear request body con Pydantic (ProductCreate, ProductUpdate) y respuesta con ProductResponse.
- Mantener el mismo prefijo de rutas `/products` para no romper el frontend.

## JWT y auth

- **JWT:** `JWTService.create_access_token({"sub": email, "role": "customer"})`, `JWTService.verify_token(token)`.
- **Password:** `JWTService.hash_password(password)`, `JWTService.verify_password(plain, hashed)`.
- **Middleware:** `get_current_user` (Depends) para rutas protegidas; `require_role("admin")` para admin.

## Configuración

- **Nueva:** `src/shared/settings.py` (Pydantic BaseSettings, variables de entorno, CORS_ORIGINS, SECRET_KEY, etc.).
- **Legacy:** `src/shared/config.py` sigue existiendo; se puede ir migrando a `settings`.

## Testing

- **tests/conftest.py:** MockProductRepository (implementa IProductRepository en memoria).
- **tests/products/application/test_create_product.py:** tests del CreateProductUseCase (éxito y validaciones).
- Ejecutar: `pytest tests/ -v` desde la raíz del backend.

## Prompts sugeridos para Cursor (Módulo 5)

1. **Conectar API a use cases:** "Refactoriza src/products/api.py para usar product_container (CreateProductUseCase, GetProductsUseCase, etc.) en lugar de llamar directamente a database. Usa los schemas de infrastructure/api/schemas.py para request/response."
2. **Auth endpoints:** "Crea endpoints POST /api/auth/login y POST /api/auth/register usando JWTService y un UserRepository. Devuelve access_token y user."
3. **Tests de repositorio:** "Añade tests en tests/products/infrastructure/test_product_repository.py que usen una BD SQLite en memoria y prueben create, get_by_id, get_all con filtros, update y delete."
