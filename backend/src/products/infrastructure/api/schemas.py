"""
Pydantic schemas para API de productos (Módulo 5 - Clean Architecture).
Request/Response DTOs.
"""
from decimal import Decimal
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class ProductBase(BaseModel):
    """Schema base de producto."""
    name: str = Field(..., min_length=2, max_length=255)
    price: Decimal = Field(..., gt=0)
    description: str = Field("", max_length=1000)
    category: str = Field(..., min_length=1, max_length=100)
    stock: int = Field(..., ge=0)


class ProductCreate(ProductBase):
    """Schema para crear producto."""
    pass


class ProductUpdate(BaseModel):
    """Schema para actualización parcial."""
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    price: Optional[Decimal] = Field(None, gt=0)
    description: Optional[str] = Field(None, max_length=1000)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    stock: Optional[int] = Field(None, ge=0)


class ProductResponse(ProductBase):
    """Schema de respuesta de producto."""
    id: int
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProductListResponse(BaseModel):
    """Schema de listado paginado."""
    products: list[ProductResponse]
    total: int
    skip: int
    limit: int
