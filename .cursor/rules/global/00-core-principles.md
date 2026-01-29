# Principios Core Inmutables del Proyecto (Módulo 7)

## Principios Arquitectónicos Fundamentales

### 1. Separation of Concerns
- **Domain Logic**: Separado de infrastructure concerns
- **UI Components**: Puros, sin lógica de negocio
- **Data Access**: Abstraído detrás de interfaces (repositories)
- **Cross-cutting Concerns**: Manejados por middleware/interceptors

### 2. Type Safety First
- **TypeScript Strict Mode**: Habilitado en toda la codebase frontend
- **End-to-End Type Safety**: Desde API hasta UI
- **No `any` types**: Excepto en casos específicamente documentados
- **Interface Segregation**: Interfaces pequeñas y específicas
- **Python**: Type hints y Pydantic en backend

### 3. Performance by Design
- **Lazy Loading**: Implementado por defecto en rutas y componentes cuando aplique
- **Memoization**: Aplicada estratégicamente con React.memo, useMemo, useCallback
- **Bundle Optimization**: Code splitting y tree shaking activos
- **Database Optimization**: Queries parametrizadas, índices apropiados

### 4. Security by Default
- **Input Validation**: Toda entrada validada con schemas (Pydantic en backend)
- **Authentication**: JWT con expiración corta; refresh cuando aplique
- **Authorization**: RBAC implementado consistentemente
- **Data Sanitization**: Automática en todos los endpoints; nunca concatenar SQL

## Patrones de Implementación Obligatorios

### Error Handling Unificado
- Respuestas API: `{ success: boolean, data?: T, error?: { code, message, details? }, meta? }`
- Frontend: estados loading/error en hooks y componentes; mensajes user-friendly
- Backend: HTTPException con códigos y mensajes consistentes

### Component Architecture Standards
- Props: obligatorias primero, opcionales después, funciones al final, children/className al final
- Orden en componentes: hooks de estado → contexto/selectors → useMemo → useCallback → early returns → render
- useCallback para handlers pasados como props; useMemo para cálculos costosos
- Loading y error states cuando aplique; ARIA cuando aplique

### Versionado de Rules
- Semantic Versioning para cambios que afecten compatibilidad
- Deprecation Warnings para patrones que serán removidos
- Migration Guides para transiciones entre versiones de rules
