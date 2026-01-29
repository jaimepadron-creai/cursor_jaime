# Git Workflow

## Branches
- `main`: rama principal / producción
- Features: `feature/nombre-descripcion` (ej. `feature/product-list-filters`)
- Fixes: `fix/nombre` (ej. `fix/products-api-validation`)

## Commits
- Mensajes claros en presente: "Add product filters", "Fix product API validation"
- Opcional: Conventional Commits — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`

## Antes de merge a main
- Build sin errores: `pnpm run build` en frontend, backend ejecutable
- Lint: `pnpm run lint` en frontend
- Resolver conflictos con main antes de merge

## Repo
- No commitear `.env`, `node_modules/`, `dist/`, lockfiles si se acuerda no subirlos (ver .gitignore)
