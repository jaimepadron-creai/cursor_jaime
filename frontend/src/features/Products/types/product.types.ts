/**
 * Tipos del dominio Products (Módulo 4 - feature-based).
 * Alineado con API backend /products.
 */
export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  stock: number
  imageUrl?: string
  is_active?: boolean
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  limit?: number
  offset?: number
}
