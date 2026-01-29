# Coding Standards

## General
- **JS/TS**: camelCase (variables, funciones), PascalCase (componentes, tipos, clases), UPPER_SNAKE para constantes
- **Python**: snake_case (PEP 8), PascalCase para clases
- **Archivos**: kebab-case
- **Imports**: orden externos → internos → relativos; agrupar por tipo (React, antd, @shared, etc.)

## TypeScript (frontend)
- TypeScript estricto
- Preferir `const`; evitar `any`; usar `unknown` si hace falta
- Interfaces para props y tipos de API
- JSDoc en funciones públicas y tipos complejos

## Python (backend)
- PEP 8, type hints en firmas
- Docstrings en módulos y funciones públicas
- Rutas en `src/<dominio>/api.py`, modelos en `models.py`, acceso a datos en `database.py`

## Estructura del repo
- `frontend/` — React + Vite + TypeScript + antd
- `backend/` — FastAPI + uvicorn
- `course-website/` — Astro (documentación del curso)
- pnpm workspace: actualmente solo `frontend` en `packages`
