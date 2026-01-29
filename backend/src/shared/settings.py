"""
Configuración con Pydantic Settings (Módulo 5 - Clean Architecture).
Variables de entorno y validación.
"""
from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Configuración de la aplicación (Módulo 5)."""

    APP_TITLE: str = "E-commerce API"
    APP_DESCRIPTION: str = "API moderna para e-commerce con Clean Architecture"
    APP_VERSION: str = "1.0.0"

    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    DATABASE_URL: str = "ecommerce.db"

    SECRET_KEY: str = "change-me-in-production-use-env"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
