# Ejemplos de Commit Messages (Conventional Commits)

Formato configurado en `.cursor/config/commit-messages.json`. Usar como referencia al revisar mensajes generados por AI.

## Feature nueva

```
feat(auth): implement OAuth 2.0 integration with Google

- Add GoogleAuthProvider component with error handling
- Implement token refresh mechanism with retry logic
- Update user store to handle OAuth user data structure
- Add comprehensive tests for OAuth flow

Breaking Change: User.authProvider field is now required
```

## Bug fix

```
fix(checkout): resolve payment validation edge case

- Handle empty cart state in payment processing
- Fix race condition in discount code application
- Add proper error messages for failed payments
- Improve retry logic for network failures

Closes #1234
```

## Performance

```
perf(dashboard): optimize data loading and rendering

- Implement React.memo for expensive components
- Add virtualization for large product lists
- Use useMemo for complex calculations
- Reduce API calls by 40% with intelligent caching

Improves initial load time from 3.2s to 1.1s
```

## Refactor

```
refactor(products): migrate API layer to Pydantic schemas

- Replace dict request/response with CreateProduct, UpdateProduct
- Add validation and type safety to all endpoints
- Remove raw SQL string concatenation
```

## Docs

```
docs(api): add OpenAPI examples for products endpoints
```

## Chore

```
chore(deps): bump react and antd to latest patch versions
```

## Reglas rápidas

- **Tipo**: feat | fix | perf | refactor | docs | chore
- **Scope** (opcional): módulo o área (auth, checkout, products, api)
- **Asunto**: imperativo, ~50 caracteres, sin punto final
- **Cuerpo**: detalle de cambios; líneas de 72 caracteres
- **Breaking**: indicar con "Breaking Change:" en cuerpo si aplica
