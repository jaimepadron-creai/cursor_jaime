"""
Middleware de autenticación (Módulo 5).
Obtener usuario actual desde JWT y requerir roles.
"""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, HTTPAuthCredentials

from ..services.jwt_service import JWTService

security = HTTPBearer(auto_error=False)


async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> Optional[dict]:
    """
    Obtiene el payload del token si existe.
    No lanza error si no hay token (útil para rutas opcionales).
    """
    if not credentials:
        return None
    payload = JWTService.verify_token(credentials.credentials)
    return payload


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> dict:
    """
    Obtiene el usuario actual desde el token JWT.
    Lanza 401 si no hay token o es inválido.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token requerido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    payload = JWTService.verify_token(credentials.credentials)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    sub = payload.get("sub")
    if sub is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"sub": sub, **payload}


def require_role(role: str):
    """Dependency que exige un rol específico (ej: admin)."""

    async def role_checker(current_user: dict = Depends(get_current_user)) -> dict:
        if current_user.get("role") != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permisos insuficientes",
            )
        return current_user

    return role_checker
