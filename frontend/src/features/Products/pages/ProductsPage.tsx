/**
 * Página de listado de productos (Módulo 4 - feature Products).
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { ProductList } from '../components/ProductList/ProductList'
import type { Product } from '../types/product.types'

export function ProductsPage() {
  const navigate = useNavigate()
  const { products, loading, error } = useProducts({ limit: 50 })

  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.id}`)
  }

  const handleAddToCart = (_product: Product) => {
    // TODO: integrar con Cart (feature Cart)
  }

  if (loading) return <div>Cargando productos...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div style={{ padding: 24 }}>
      <h1>Productos</h1>
      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </div>
  )
}
