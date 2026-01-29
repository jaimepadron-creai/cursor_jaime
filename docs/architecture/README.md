# Architecture (Módulo 7)

## Visión general

- **Frontend**: React 18 + TypeScript + Vite, arquitectura por features (`frontend/src/features/`), Ant Design, apiClient compartido.
- **Backend**: FastAPI + Python, Clean Architecture (domain → application → infrastructure), SQLite por defecto, repositorios con queries parametrizadas.
- **Comunicación**: REST; frontend llama a backend (proxy en dev `/api` → 8000).

## Estructura del repo

```
repo/
├── frontend/          # React, Vite, features (Products, Auth), shared
├── backend/           # FastAPI, src/products (domain, application, infrastructure), src/shared
├── course-website/    # Astro (documentación del curso)
├── docs/              # Documentación del proyecto
└── .cursor/            # Rules, notepads, memories, config
```

## Decisiones arquitectónicas

- Ver `.cursor/memories/architectural-decisions/` para ADRs (stack, UI, API productos).
- Ver `.cursor/notepads/shared/` para guías de frontend, backend, deployment.
