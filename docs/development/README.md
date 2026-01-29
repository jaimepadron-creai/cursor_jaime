# Development Guide (Módulo 7)

## Requisitos

- **Node.js** >= 18 (frontend: pnpm)
- **Python** >= 3.11 (backend)
- **Git**

## Setup local

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
# API en http://localhost:8000
```

### Frontend
```bash
cd frontend
pnpm install
pnpm run dev
# App en http://localhost:3000 (proxy /api → 8000)
```

### Con Docker
```bash
docker compose up --build
# Backend: 8000, Frontend: 3000
```

## Estándares de código

- **Frontend**: ver `.cursor/rules/frontend.mdc` y `.cursor/notepads/shared/coding-standards.md`
- **Backend**: ver `.cursor/rules/backend.mdc` y `.cursor/notepads/backend/`
- **Tests**: backend `pytest tests/`, frontend `pnpm run lint` y build

## Documentación y reglas

- **Rules**: `.cursor/rules/` (global, frontend, backend, testing, patterns)
- **Rules evolutivas**: `.cursor/rules/global/`, `.cursor/rules/domain/`
- **Notepads**: `.cursor/notepads/` (design system, API, backend, shared)
- **Memories**: `.cursor/memories/` (ADRs, technology-choices, lessons-learned)
