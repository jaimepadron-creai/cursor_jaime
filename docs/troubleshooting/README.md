# Troubleshooting (Módulo 7)

## Reglas y contexto Cursor

- **Reglas no se aplican**: revisar sintaxis de `.mdc` (frontmatter con `globs`, `alwaysApply`); ver `.cursor/TROUBLESHOOTING.md`
- **Contexto insuficiente**: revisar `.cursorignore`; usar `@Files` para incluir archivos relevantes

## Backend

- **BD no inicia**: comprobar que `ecommerce.db` se puede crear (permisos, path); revisar `backend/src/shared/database.py` y `src/products/database.py`
- **Tests fallan**: ejecutar `pytest tests/ -v` desde `backend/`; comprobar dependencias en `requirements.txt`
- **Import errors**: ejecutar desde la raíz del backend o con `PYTHONPATH` adecuado

## Frontend

- **Build falla**: `pnpm run build` en `frontend/`; revisar errores de TypeScript y ESLint
- **API no responde**: comprobar que el backend está en 8000 y que el proxy (Vite) apunta a 8000; en Docker, que frontend use baseURL `/api` si se sirve por nginx

## DevOps

- **Docker**: ver `.cursor/notepads/shared/devops-modulo-6.md`; logs con `docker compose logs backend` / `docker compose logs frontend`
- **CI**: workflows en `.github/workflows/`; comprobar rutas `backend/**` y `frontend/**` en `on.push.paths`
