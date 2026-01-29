# Rules de Autenticación (Módulo 7)

## Contexto de Activación
Aplicar cuando se trabaje en: **/auth/** OR contiene "login" OR "register" OR "authenticate" OR "JWT" OR "token".

## Patrones de Implementación Obligatorios

### 1. JWT Token Management
- **Estructura**: accessToken (corta expiración), refreshToken cuando aplique, tokenType: 'Bearer', expiresAt
- **Almacenamiento**: considerar httpOnly cookies en producción; localStorage solo si se acepta el riesgo XSS
- **Auto-refresh**: implementar refresh antes de expiración cuando haya refreshToken
- **Logout**: limpiar tokens y estado; llamar a logout en backend si aplica

### 2. Protected Routes
- **Wrapper**: componente que compruebe isAuthenticated; redirigir a /login si no autenticado
- **Roles**: cuando aplique, comprobar requiredRoles antes de renderizar hijos; redirigir a /unauthorized si no tiene rol
- **Loading**: mostrar loading mientras se resuelve auth; no flash de contenido protegido

### 3. Backend (FastAPI)
- **Middleware/Dependency**: get_current_user que verifique JWT; extraer sub (email/id) del payload
- **Password**: hash con bcrypt (passlib); nunca almacenar ni loguear contraseñas en claro
- **Endpoints**: /login (devuelve tokens + user), /register (validación + hash), /refresh cuando aplique

## Security Checklist Obligatorio
- [ ] Input validation con Pydantic (backend) / schemas (frontend)
- [ ] Rate limiting en endpoints de login/register cuando aplique
- [ ] HTTPS enforcement en producción
- [ ] Password hashing con bcrypt (factor 12+)
- [ ] Session/token timeout apropiado
- [ ] Proper logout cleanup (tokens, estado, opcional invalidar en backend)
