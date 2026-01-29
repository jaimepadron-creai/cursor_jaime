# Patrones Arquitectónicos (Módulo 7)

## Frontend
- **Feature-Based Architecture**: features/X con components/, pages/, hooks/, services/, types/
- **Shared**: componentes, hooks y utilidades reutilizables en shared/
- **API**: apiClient centralizado; servicios por dominio (productsApi, etc.) que usan apiClient
- **Estado**: Context para auth; hooks para datos por feature (useProducts, useLocalStorage)

## Backend
- **Clean Architecture**: domain (models, interfaces) → application (use cases) → infrastructure (repositories, API)
- **Dependency Injection**: container (executions.py) con repositorios y use cases
- **Rutas**: prefijo por recurso (/products); schemas Pydantic para request/response
- **BD**: repositorios con queries parametrizadas; sin SQL por concatenación

## Comunicación
- **REST**: GET/POST/PUT/DELETE con códigos HTTP apropiados
- **Formato**: éxito `{ success: true, data }`, error `{ success: false, error: { code, message } }`
- **CORS**: orígenes explícitos en producción; no `*` en prod
