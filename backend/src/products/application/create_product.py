"""
Use case: crear producto (Módulo 5 - Clean Architecture).
Lógica de negocio aislada de la API y de la base de datos.
"""
from decimal import Decimal
from ..domain.models.product import Product
from ..domain.interfaces.repositories import IProductRepository


class CreateProductUseCase:
    """Use case para crear un producto."""

    def __init__(self, product_repository: IProductRepository) -> None:
        self.product_repository = product_repository

    def execute(
        self,
        name: str,
        price: Decimal,
        description: str,
        category: str,
        stock: int,
    ) -> Product:
        """
        Ejecuta la creación de un producto.
        Raises:
            ValueError: Si los datos son inválidos.
        """
        if not name or len(name.strip()) < 2:
            raise ValueError("El nombre del producto debe tener al menos 2 caracteres")

        if price <= 0:
            raise ValueError("El precio debe ser mayor a 0")

        if stock < 0:
            raise ValueError("El stock no puede ser negativo")

        product = Product(
            id=None,
            name=name.strip(),
            price=price,
            description=(description or "").strip(),
            category=category.strip(),
            stock=stock,
        )

        return self.product_repository.create(product)
