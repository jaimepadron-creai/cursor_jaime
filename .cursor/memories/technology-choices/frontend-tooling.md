# Technology Choices — Frontend Tooling

## Package manager: pnpm
- pnpm workspace definido en raíz (`pnpm-workspace.yaml`) con `frontend` en packages
- Uso de pnpm para instalación y scripts en frontend
- Ventaja: disco y velocidad; workspace para futuros paquetes compartidos

## Build: Vite
- Vite 5 para dev y build del frontend
- Plugin `@vitejs/plugin-react`
- Proxy en dev: `/api` → `http://localhost:8000`
- Aliases: `@`, `@shared`, `@features` (path.resolve en vite.config.ts)

## Linting: ESLint
- ESLint con TypeScript y React (hooks, refresh)
- Script: `pnpm run lint` en frontend
- Configuración en frontend (ext .ts, .tsx; max-warnings 0)

## Lenguaje y tipos
- TypeScript estricto
- Tipos de React (@types/react, @types/react-dom)
- Sin Tailwind en package.json actual; UI con Ant Design
