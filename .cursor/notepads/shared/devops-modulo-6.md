# DevOps y Deployment (Módulo 6)

## Resumen del Módulo 6

**Tema:** DevOps y deployment con Cursor AI: Docker, CI/CD (GitHub Actions), cloud, Infrastructure as Code, monitoring y secretos.

**Objetivos:** Containerizar con Docker multi-stage, automatizar CI/CD, desplegar en cloud (AWS/GCP), monitoring (Prometheus/Grafana), gestión de secretos y estrategias de deployment (blue-green, canary).

---

## Estructura implementada (Módulo 6)

```
repo/
├── backend/
│   ├── Dockerfile          # Multi-stage: base → dependencies → production
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile          # Multi-stage: builder (Node+pnpm) → production (nginx)
│   ├── nginx.conf          # SPA + proxy /api → backend:8000
│   └── .dockerignore
├── docker-compose.yml      # backend + frontend (SQLite por defecto)
└── .github/workflows/
    ├── backend.yml         # pytest, lint (opcional)
    └── frontend.yml        # pnpm install, lint, build
```

## Cómo usar

### Docker Compose (desarrollo/producción local)

```bash
# Desde la raíz del repo
docker compose up --build

# Backend: http://localhost:8000
# Frontend: http://localhost:3000 (nginx en 8080 mapeado a 3000)
```

- **Backend:** FastAPI en 8000, SQLite en `ecommerce.db` dentro del contenedor (datos efímeros si no se monta volumen).
- **Frontend:** Build Vite servido por nginx en 8080; `/api/*` se reenvía a `backend:8000/*`.

### Frontend y API en Docker

Para que el frontend en Docker llame al backend vía nginx:

1. El frontend debe usar **URL base relativa** para la API (ej. `/api`) para que las peticiones vayan al mismo origen y nginx las reenvíe.
2. En build: definir `VITE_API_BASE_URL=/api` y en `apiClient` usar `import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'` como baseURL.
3. nginx ya está configurado: `location /api/` → rewrite a backend `http://backend:8000/*`.

### Build manual de imágenes

```bash
# Backend
docker build -t ecommerce-backend:latest ./backend --target production

# Frontend
docker build -t ecommerce-frontend:latest ./frontend --target production
```

### CI/CD (GitHub Actions)

- **Backend:** en push/PR a `main`/`develop` con cambios en `backend/` → install deps, pytest, flake8 (opcional).
- **Frontend:** en push/PR con cambios en `frontend/` → pnpm install, lint, build.

Los workflows están en `.github/workflows/backend.yml` y `.github/workflows/frontend.yml`.

## Próximos pasos (según módulo)

1. **PostgreSQL/Redis en Docker:** añadir servicios `db` y `redis` en `docker-compose.yml` y configurar backend con `DATABASE_URL` y `REDIS_URL`.
2. **Secrets:** usar GitHub Secrets para `SECRET_KEY`, `DB_PASSWORD`, etc., y pasarlos en CI o en deploy.
3. **Build y push de imágenes:** en CI, build de imágenes Docker y push a GHCR u otro registry.
4. **Terraform/AWS:** VPC, ECS, RDS, ALB (ver ejemplos en el módulo).
5. **Monitoring:** Prometheus, Grafana, reglas de alertas (ver ejemplos en el módulo).

## Prompts sugeridos para Cursor (Módulo 6)

1. "Añade al backend uso de `DATABASE_URL` desde entorno para que en Docker podamos apuntar a PostgreSQL o a un path para SQLite."
2. "Configura el frontend para que use `VITE_API_BASE_URL` en apiClient y así en Docker las peticiones vayan a /api."
3. "Añade un job en GitHub Actions que haga build de la imagen Docker del backend y la suba a GHCR en pushes a main."
4. "Crea un docker-compose.override.yml con PostgreSQL y Redis y variables de entorno para el backend."

## Troubleshooting

- **Contenedor backend no arranca:** revisar logs con `docker compose logs backend`; comprobar que `main:app` y el puerto 8000 son correctos.
- **Frontend no llega al API:** comprobar que las peticiones usan `/api` y que nginx hace proxy a `backend:8000`.
- **CI falla en tests:** ejecutar `pytest tests/` localmente en `backend/`; revisar que no falten dependencias en `requirements.txt`.
