"""
Domain model Product (Módulo 5 - Clean Architecture).
Entidad de negocio con reglas y métodos.
"""
from dataclasses import dataclass
from decimal import Decimal
from typing import Optional
from datetime import datetime


@dataclass
class Product:
    id: Optional[int]
    name: str
    price: Decimal
    description: str
    category: str
    stock: int
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def __post_init__(self) -> None:
        if self.created_at is None:
            self.created_at = datetime.utcnow()
        if self.updated_at is None:
            self.updated_at = datetime.utcnow()

    def update_stock(self, quantity: int) -> None:
        """Actualiza el stock del producto."""
        if quantity < 0 and abs(quantity) > self.stock:
            raise ValueError("Stock insuficiente")
        self.stock += quantity
        self.updated_at = datetime.utcnow()

    def is_available(self) -> bool:
        """Verifica si el producto está disponible."""
        return self.is_active and self.stock > 0

    def calculate_total_price(self, quantity: int) -> Decimal:
        """Calcula el precio total para una cantidad."""
        if quantity <= 0:
            raise ValueError("Cantidad debe ser mayor a 0")
        return self.price * quantity
