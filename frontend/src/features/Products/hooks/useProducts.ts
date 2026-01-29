/**
 * Hook para listado de productos con filtros (Módulo 4).
 * Usa useState + useEffect; para cache/refetch considerar React Query.
 */
import { useState, useEffect, useCallback } from 'react'
import type { Product, ProductFilters } from '../types/product.types'
import { productsApi } from '../services/productsApi'

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productsApi.getProducts(filters)
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [
    filters?.category,
    filters?.minPrice,
    filters?.maxPrice,
    filters?.search,
    filters?.limit,
    filters?.offset,
  ])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}
