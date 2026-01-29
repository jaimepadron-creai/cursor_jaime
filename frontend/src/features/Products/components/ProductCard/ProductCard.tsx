/**
 * ProductCard con React.memo (Módulo 4 - optimización).
 */
import React, { memo, useCallback } from 'react'
import type { Product } from '../../types/product.types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
}

export const ProductCard = memo<ProductCardProps>(function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}) {
  const handleAddToCart = useCallback(() => {
    onAddToCart?.(product)
  }, [product, onAddToCart])

  const handleViewDetails = useCallback(() => {
    onViewDetails?.(product)
  }, [product, onViewDetails])

  return (
    <div className="product-card" style={{ border: '1px solid #eee', padding: 16, borderRadius: 8 }}>
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} loading="lazy" style={{ maxWidth: '100%', height: 'auto' }} />
      ) : (
        <div style={{ height: 120, background: '#f0f0f0', borderRadius: 4 }} />
      )}
      <h3 style={{ margin: '8px 0' }}>{product.name}</h3>
      <p className="price" style={{ fontWeight: 600 }}>${product.price}</p>
      {product.description && <p style={{ fontSize: 14, color: '#666' }}>{product.description}</p>}
      <div className="product-card__actions" style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        {onViewDetails && (
          <button type="button" onClick={handleViewDetails}>
            Ver Detalles
          </button>
        )}
        {onAddToCart && (
          <button type="button" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        )}
      </div>
    </div>
  )
})
