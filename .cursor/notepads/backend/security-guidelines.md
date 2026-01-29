# Security Guidelines

## API (FastAPI)
- **CORS**: En producción no usar `allow_origins=["*"]`; listar orígenes permitidos
- **Inputs**: Validar con Pydantic; no confiar en body/query sin schema
- **SQL**: No construir queries con f-strings ni concatenación de user input; usar parámetros
- **Logs**: No loguear cuerpos de request ni datos sensibles
- **Secrets**: Variables de entorno para URLs de BD, API keys; no en repo

## Frontend
- No guardar tokens en localStorage sin considerar XSS; usar httpOnly cookies si hay sesión
- Llamadas a API vía proxy en dev; en prod configurar CORS y URL base desde env

## Repo
- `.env` y `.env.*` en `.gitignore`
- No subir credenciales ni API keys
