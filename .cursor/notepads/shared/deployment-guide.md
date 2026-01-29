# Deployment Guide

## Desarrollo local
- **Backend**: desde `backend/` — `python main.py` o `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
- **Frontend**: desde `frontend/` — `pnpm run dev` (Vite, puerto 3000; proxy `/api` → 8000)
- **Course website**: desde `course-website/` — `pnpm run dev` (Astro)

## Variables de entorno
- Backend: URL/credenciales de BD, CORS origins si aplica
- Frontend: `VITE_API_BASE_URL` o similar para producción (en dev se usa proxy)

## Checklist pre-deploy
- Variables de entorno configuradas en el entorno objetivo
- Backend: BD accesible (SQLite file o servidor)
- Frontend: `pnpm run build` sin errores
- Health check: `GET /health` del backend

## Producción (referencia)
- Servir frontend estático (Nginx, Vercel, etc.) y apuntar API al backend
- Backend: uvicorn con workers, detrás de reverse proxy (Nginx) con SSL
- CORS restringido a orígenes del frontend
