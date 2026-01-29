"""
Tests del use case CreateProduct (Módulo 5 - Clean Architecture).
"""
import pytest
from decimal import Decimal
from src.products.application.create_product import CreateProductUseCase
from src.products.domain.models.product import Product
from tests.conftest import MockProductRepository


class TestCreateProductUseCase:
    """Tests para CreateProductUseCase."""

    def test_create_product_success(self, mock_repository: MockProductRepository) -> None:
        """Creación exitosa de producto."""
        use_case = CreateProductUseCase(mock_repository)
        result = use_case.execute(
            name="Test Product",
            price=Decimal("99.99"),
            description="Test description",
            category="Electronics",
            stock=10,
        )
        assert result.id is not None
        assert result.name == "Test Product"
        assert result.price == Decimal("99.99")
        assert result.category == "Electronics"
        assert result.stock == 10
        assert len(mock_repository.products) == 1

    def test_create_product_invalid_name_empty(self, mock_repository: MockProductRepository) -> None:
        """Nombre vacío debe lanzar ValueError."""
        use_case = CreateProductUseCase(mock_repository)
        with pytest.raises(ValueError, match="al menos 2 caracteres"):
            use_case.execute(
                name="",
                price=Decimal("99.99"),
                description="Test description",
                category="Electronics",
                stock=10,
            )

    def test_create_product_invalid_name_short(self, mock_repository: MockProductRepository) -> None:
        """Nombre de un carácter debe lanzar ValueError."""
        use_case = CreateProductUseCase(mock_repository)
        with pytest.raises(ValueError, match="al menos 2 caracteres"):
            use_case.execute(
                name="A",
                price=Decimal("99.99"),
                description="Test description",
                category="Electronics",
                stock=10,
            )

    def test_create_product_invalid_price(self, mock_repository: MockProductRepository) -> None:
        """Precio <= 0 debe lanzar ValueError."""
        use_case = CreateProductUseCase(mock_repository)
        with pytest.raises(ValueError, match="mayor a 0"):
            use_case.execute(
                name="Test Product",
                price=Decimal("-10.00"),
                description="Test description",
                category="Electronics",
                stock=10,
            )

    def test_create_product_invalid_stock(self, mock_repository: MockProductRepository) -> None:
        """Stock negativo debe lanzar ValueError."""
        use_case = CreateProductUseCase(mock_repository)
        with pytest.raises(ValueError, match="no puede ser negativo"):
            use_case.execute(
                name="Test Product",
                price=Decimal("99.99"),
                description="Test description",
                category="Electronics",
                stock=-1,
            )
