"""
Interfaz del repositorio de productos (Módulo 5 - Clean Architecture).
La capa de aplicación depende de esta interfaz, no de la implementación.
"""
from abc import ABC, abstractmethod
from typing import List, Optional

from ..models.product import Product


class IProductRepository(ABC):
    """Interfaz para el repositorio de productos."""

    @abstractmethod
    def create(self, product: Product) -> Product:
        """Crea un nuevo producto."""
        pass

    @abstractmethod
    def get_by_id(self, product_id: int) -> Optional[Product]:
        """Obtiene un producto por ID."""
        pass

    @abstractmethod
    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        search: Optional[str] = None,
    ) -> List[Product]:
        """Obtiene productos con filtros opcionales."""
        pass

    @abstractmethod
    def update(self, product: Product) -> Product:
        """Actualiza un producto."""
        pass

    @abstractmethod
    def delete(self, product_id: int) -> bool:
        """Elimina un producto."""
        pass
