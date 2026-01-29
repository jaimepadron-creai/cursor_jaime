"""
Use case: eliminar producto (Módulo 5 - Clean Architecture).
"""
from ..domain.interfaces.repositories import IProductRepository


class DeleteProductUseCase:
    """Use case para eliminar un producto."""

    def __init__(self, product_repository: IProductRepository) -> None:
        self.product_repository = product_repository

    def execute(self, product_id: int) -> bool:
        """Ejecuta la eliminación de un producto. Retorna True si se eliminó."""
        return self.product_repository.delete(product_id)
