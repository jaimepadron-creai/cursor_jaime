# ADR-001: Stack React + FastAPI

## Status
**Aceptado** — Proyecto E-commerce Evolution / curso Cursor

## Contexto
Se necesitaba un stack moderno para frontend y backend que permita:
- Desarrollo rápido con buenas prácticas
- TypeScript en frontend y tipado en backend
- API REST clara y documentada
- Fácil despliegue y aprendizaje

## Decisión
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: FastAPI + Python 3.x + uvicorn
- **Comunicación**: REST; frontend con proxy `/api` → backend en desarrollo

## Justificación
- **React + Vite**: ecosistema maduro, Vite rápido para dev y build
- **FastAPI**: OpenAPI automático, Pydantic para validación, async nativo
- **Separación frontend/backend**: permite escalar y desplegar por separado

## Consecuencias
- **Positivas**: API documentada, tipado en ambos lados, desarrollo ágil
- **Negativas**: Dos runtimes (Node, Python); coordinar versiones y despliegue

## Implementación
- Repo raíz con carpetas `frontend/`, `backend/`, `course-website/`
- pnpm workspace con `frontend` en packages
- Backend en `backend/` con `main.py` y `src/` por dominio (products, shared)

**Revisión**: Evaluar si añadir backend al pnpm workspace o scripts raíz para dev conjunto.
