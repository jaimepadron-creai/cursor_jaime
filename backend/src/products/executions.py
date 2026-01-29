"""
Container de dependencias para Products (Módulo 5 - Clean Architecture).
Dependency Injection: repositorio + use cases.
"""
from .application.create_product import CreateProductUseCase
from .application.get_products import GetProductsUseCase, GetProductByIdUseCase
from .application.update_product import UpdateProductUseCase
from .application.delete_product import DeleteProductUseCase
from .infrastructure.db.repositories.product_repository import SQLiteProductRepository


class ProductContainer:
    """Container de dependencias para el módulo Products."""

    def __init__(self) -> None:
        self.product_repository = SQLiteProductRepository()
        self.create_product_use_case = CreateProductUseCase(self.product_repository)
        self.get_products_use_case = GetProductsUseCase(self.product_repository)
        self.get_product_by_id_use_case = GetProductByIdUseCase(self.product_repository)
        self.update_product_use_case = UpdateProductUseCase(self.product_repository)
        self.delete_product_use_case = DeleteProductUseCase(self.product_repository)


product_container = ProductContainer()
