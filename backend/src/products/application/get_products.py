"""
Use case: obtener productos (Módulo 5 - Clean Architecture).
"""
from typing import List, Optional

from ..domain.models.product import Product
from ..domain.interfaces.repositories import IProductRepository


class GetProductsUseCase:
    """Use case para obtener listado de productos."""

    def __init__(self, product_repository: IProductRepository) -> None:
        self.product_repository = product_repository

    def execute(
        self,
        skip: int = 0,
        limit: int = 100,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        search: Optional[str] = None,
    ) -> List[Product]:
        """Ejecuta la obtención de productos con filtros opcionales."""
        return self.product_repository.get_all(
            skip=skip,
            limit=limit,
            category=category,
            min_price=min_price,
            max_price=max_price,
            search=search,
        )


class GetProductByIdUseCase:
    """Use case para obtener un producto por ID."""

    def __init__(self, product_repository: IProductRepository) -> None:
        self.product_repository = product_repository

    def execute(self, product_id: int) -> Optional[Product]:
        """Ejecuta la obtención de un producto por ID."""
        return self.product_repository.get_by_id(product_id)
