/**
 * ProductList con useMemo y useCallback (Módulo 4 - optimización).
 */
import React, { useMemo, useCallback } from 'react'
import { ProductCard } from '../ProductCard/ProductCard'
import type { Product } from '../../types/product.types'

interface ProductListProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
  onViewDetails?: (product: Product) => void
  filters?: {
    category?: string
    minPrice?: number
    maxPrice?: number
  }
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  filters,
}) => {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters?.category && product.category !== filters.category) return false
      if (filters?.minPrice != null && product.price < filters.minPrice!) return false
      if (filters?.maxPrice != null && product.price > filters.maxPrice!) return false
      return true
    })
  }, [products, filters?.category, filters?.minPrice, filters?.maxPrice])

  const handleAddToCart = useCallback(
    (product: Product) => {
      onAddToCart?.(product)
    },
    [onAddToCart]
  )

  const handleViewDetails = useCallback(
    (product: Product) => {
      onViewDetails?.(product)
    },
    [onViewDetails]
  )

  return (
    <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  )
}
