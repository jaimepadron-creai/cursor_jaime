"""
Configuración de tests (Módulo 5 - pytest).
Fixtures compartidos para tests del backend.
"""
import pytest
from decimal import Decimal
from unittest.mock import Mock
from src.products.domain.models.product import Product
from src.products.domain.interfaces.repositories import IProductRepository


class MockProductRepository(IProductRepository):
    """Repositorio mock para tests de use cases."""

    def __init__(self) -> None:
        self.products: dict[int, Product] = {}
        self._next_id = 1

    def create(self, product: Product) -> Product:
        product_id = self._next_id
        self._next_id += 1
        created = Product(
            id=product_id,
            name=product.name,
            price=product.price,
            description=product.description,
            category=product.category,
            stock=product.stock,
            is_active=product.is_active,
            created_at=product.created_at,
            updated_at=product.updated_at,
        )
        self.products[product_id] = created
        return created

    def get_by_id(self, product_id: int):
        return self.products.get(product_id)

    def get_all(self, skip=0, limit=100, category=None, min_price=None, max_price=None, search=None):
        items = list(self.products.values())
        if category:
            items = [p for p in items if p.category == category]
        if min_price is not None:
            items = [p for p in items if float(p.price) >= min_price]
        if max_price is not None:
            items = [p for p in items if float(p.price) <= max_price]
        if search:
            items = [p for p in items if search.lower() in p.name.lower() or search.lower() in (p.description or "").lower()]
        return items[skip : skip + limit]

    def update(self, product: Product) -> Product:
        if product.id not in self.products:
            raise ValueError("Product not found")
        self.products[product.id] = product
        return product

    def delete(self, product_id: int) -> bool:
        if product_id in self.products:
            del self.products[product_id]
            return True
        return False


@pytest.fixture
def mock_repository() -> MockProductRepository:
    """Repositorio mock para tests."""
    return MockProductRepository()
