"""
Use case: actualizar producto (Módulo 5 - Clean Architecture).
"""
from decimal import Decimal
from typing import Optional

from ..domain.models.product import Product
from ..domain.interfaces.repositories import IProductRepository


class UpdateProductUseCase:
    """Use case para actualizar un producto."""

    def __init__(self, product_repository: IProductRepository) -> None:
        self.product_repository = product_repository

    def execute(
        self,
        product_id: int,
        name: Optional[str] = None,
        price: Optional[Decimal] = None,
        description: Optional[str] = None,
        category: Optional[str] = None,
        stock: Optional[int] = None,
    ) -> Optional[Product]:
        """
        Ejecuta la actualización de un producto.
        Returns None si el producto no existe.
        """
        existing = self.product_repository.get_by_id(product_id)
        if not existing:
            return None

        if name is not None and len(name.strip()) < 2:
            raise ValueError("El nombre debe tener al menos 2 caracteres")
        if price is not None and price <= 0:
            raise ValueError("El precio debe ser mayor a 0")
        if stock is not None and stock < 0:
            raise ValueError("El stock no puede ser negativo")

        updated = Product(
            id=existing.id,
            name=name.strip() if name else existing.name,
            price=price if price is not None else existing.price,
            description=description.strip() if description is not None else existing.description,
            category=category.strip() if category else existing.category,
            stock=stock if stock is not None else existing.stock,
            is_active=existing.is_active,
            created_at=existing.created_at,
            updated_at=existing.updated_at,
        )
        return self.product_repository.update(updated)
