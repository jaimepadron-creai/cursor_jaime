# Lessons Learned — Seguridad y validación en API

## Problema
En la API de productos inicial se usaban:
- Queries SQL construidas con f-strings y concatenación de input del usuario
- Parámetros de request como `dict` sin schemas Pydantic
- CORS `allow_origins=["*"]` y logging de queries con datos sensibles

## Riesgos
- SQL injection
- Datos no validados (tipos, rangos, obligatoriedad)
- Exposición de información en logs
- CORS demasiado permisivo en producción

## Acciones recomendadas
1. **SQL**: Usar siempre parámetros (?) o ORM; nunca concatenar user input en SQL
2. **Request body**: Definir modelos Pydantic (CreateProduct, UpdateProduct) y usarlos en los endpoints
3. **CORS**: En producción listar orígenes permitidos; no `*`
4. **Logs**: No loguear cuerpos de request ni queries con datos sensibles
5. **Validación**: Dejar que Pydantic valide tipos y rangos; devolver 422 con detalles

## Referencia
- Ver `.cursor/notepads/backend/security-guidelines.md`
- Ver `.cursor/notepads/backend/api-standards.md`
