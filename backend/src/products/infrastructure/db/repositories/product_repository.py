"""
Repositorio SQLite de productos (Módulo 5 - Clean Architecture).
Implementación con queries parametrizadas (sin SQL injection).
"""
import sqlite3
from decimal import Decimal
from typing import List, Optional
from datetime import datetime

from src.shared.database import get_connection
from ....domain.models.product import Product
from ....domain.interfaces.repositories import IProductRepository


def _row_to_product(row: tuple) -> Product:
    """Convierte una fila de la BD a entidad Product."""
    return Product(
        id=row[0],
        name=row[1],
        price=Decimal(str(row[2])),
        description=row[5] or "",
        category=row[4],
        stock=row[3],
        is_active=bool(row[6]) if len(row) > 6 else True,
        created_at=datetime.fromisoformat(row[7]) if len(row) > 7 and row[7] else None,
        updated_at=datetime.fromisoformat(row[8]) if len(row) > 8 and row[8] else None,
    )


class SQLiteProductRepository(IProductRepository):
    """Implementación SQLite del repositorio de productos (sync)."""

    def create(self, product: Product) -> Product:
        conn = get_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO products (name, price, stock, category, description, is_active, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    product.name,
                    float(product.price),
                    product.stock,
                    product.category,
                    product.description,
                    1 if product.is_active else 0,
                    product.created_at.isoformat() if product.created_at else None,
                    product.updated_at.isoformat() if product.updated_at else None,
                ),
            )
            product_id = cursor.lastrowid
            conn.commit()
            return Product(
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
        finally:
            conn.close()

    def get_by_id(self, product_id: int) -> Optional[Product]:
        conn = get_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM products WHERE id = ? AND is_active = 1", (product_id,))
            row = cursor.fetchone()
            if not row:
                return None
            return _row_to_product(row)
        finally:
            conn.close()

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        search: Optional[str] = None,
    ) -> List[Product]:
        conn = get_connection()
        try:
            cursor = conn.cursor()
            query = "SELECT * FROM products WHERE is_active = 1"
            params: list = []
            if category:
                query += " AND category = ?"
                params.append(category)
            if min_price is not None:
                query += " AND price >= ?"
                params.append(min_price)
            if max_price is not None:
                query += " AND price <= ?"
                params.append(max_price)
            if search:
                query += " AND (name LIKE ? OR description LIKE ?)"
                params.extend([f"%{search}%", f"%{search}%"])
            query += " ORDER BY id LIMIT ? OFFSET ?"
            params.extend([limit, skip])
            cursor.execute(query, params)
            rows = cursor.fetchall()
            return [_row_to_product(row) for row in rows]
        finally:
            conn.close()

    def update(self, product: Product) -> Product:
        if product.id is None:
            raise ValueError("Product id is required for update")
        conn = get_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                """
                UPDATE products
                SET name = ?, price = ?, stock = ?, category = ?, description = ?, updated_at = ?
                WHERE id = ? AND is_active = 1
                """,
                (
                    product.name,
                    float(product.price),
                    product.stock,
                    product.category,
                    product.description,
                    datetime.utcnow().isoformat(),
                    product.id,
                ),
            )
            conn.commit()
            return product
        finally:
            conn.close()

    def delete(self, product_id: int) -> bool:
        conn = get_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
            conn.commit()
            return cursor.rowcount > 0
        finally:
            conn.close()
