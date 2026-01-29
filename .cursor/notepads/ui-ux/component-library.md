# Component Library

## Ubicación
- **Compartidos**: `frontend/src/shared/components/`
- **Layout**: `frontend/src/shared/components/Layout/` (Header, etc.)
- **Páginas**: `frontend/src/pages/` (HomePage, etc.)

## Stack
- React 18 + TypeScript
- Ant Design (antd) para componentes base
- React Router DOM para rutas

## Convenciones
- Un componente por archivo
- Props tipadas con interfaces TypeScript
- Export default para componentes de página; named exports para utilidades y componentes reutilizables
- Usar path alias `@shared` para imports desde `shared/`

## Ejemplo de estructura
```
frontend/src/
  shared/
    components/
      Layout/
        Header.tsx
    services/
      apiClient.ts
    types/
      index.ts
  pages/
    HomePage.tsx
```
