"""
Servicio JWT (Módulo 5 - autenticación).
Crear/verificar tokens y hashing de contraseñas con bcrypt.
"""
from datetime import datetime, timedelta
from typing import Optional
import jwt
from passlib.context import CryptContext

try:
    from ..settings import settings
except ImportError:
    from src.shared.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class JWTService:
    """Servicio para manejo de JWT y contraseñas."""

    @staticmethod
    def create_access_token(
        data: dict,
        expires_delta: Optional[timedelta] = None,
    ) -> str:
        """Crea un token de acceso JWT."""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(
                minutes=getattr(settings, "ACCESS_TOKEN_EXPIRE_MINUTES", 30)
            )
        to_encode.update({"exp": expire})
        secret = getattr(settings, "SECRET_KEY", "change-me")
        algo = getattr(settings, "ALGORITHM", "HS256")
        return jwt.encode(to_encode, secret, algorithm=algo)

    @staticmethod
    def verify_token(token: str) -> Optional[dict]:
        """Verifica y decodifica un token JWT."""
        try:
            secret = getattr(settings, "SECRET_KEY", "change-me")
            algo = getattr(settings, "ALGORITHM", "HS256")
            payload = jwt.decode(token, secret, algorithms=[algo])
            return payload
        except jwt.PyJWTError:
            return None

    @staticmethod
    def hash_password(password: str) -> str:
        """Hashea una contraseña con bcrypt."""
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verifica una contraseña contra su hash."""
        return pwd_context.verify(plain_password, hashed_password)
