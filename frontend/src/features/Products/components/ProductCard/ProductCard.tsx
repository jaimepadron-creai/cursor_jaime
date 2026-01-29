/**
 * ProductCard con React.memo (Módulo 4). Mejoras visuales Módulo 9: espaciado, hover, CTA.
 */
import React, { memo, useCallback, useState } from 'react'
import type { Product } from '../../types/product.types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #eee',
  borderRadius: 8,
  overflow: 'hidden',
  background: '#fff',
  transition: 'box-shadow 0.3s ease',
}

const cardHoverStyle = { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }

export const ProductCard = memo<ProductCardProps>(function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}) {
  const [hover, setHover] = useState(false)
  const handleAddToCart = useCallback(() => {
    onAddToCart?.(product)
  }, [product, onAddToCart])

  const handleViewDetails = useCallback(() => {
    onViewDetails?.(product)
  }, [product, onViewDetails])

  return (
    <div
      className="product-card"
      style={{ ...cardStyle, ...(hover ? cardHoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: 'relative' }}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: 180, objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: 180, background: '#f0f0f0' }} />
        )}
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600, color: '#111' }}>
          {product.name}
        </h3>
        <p className="price" style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: '#111' }}>
          ${product.price}
        </p>
        {product.description && (
          <p style={{ margin: '0 0 16px', fontSize: 14, color: '#666', lineHeight: 1.4 }}>
            {product.description}
          </p>
        )}
        <div className="product-card__actions" style={{ display: 'flex', gap: 12 }}>
          {onViewDetails && (
            <button
              type="button"
              onClick={handleViewDetails}
              style={{
                padding: '8px 16px',
                border: '1px solid #1677ff',
                borderRadius: 6,
                background: 'transparent',
                color: '#1677ff',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Ver Detalles
            </button>
          )}
          {onAddToCart && (
            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: 6,
                background: '#1677ff',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Agregar al Carrito
            </button>
          )}
        </div>
      </div>
    </div>
  )
})
