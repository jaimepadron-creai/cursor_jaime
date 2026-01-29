/**
 * API de productos (Módulo 4). Usa el apiClient compartido.
 * Backend: GET/POST /products, GET/PUT/DELETE /products/:id
 */
import { apiClient } from '@shared/services/apiClient'
import type { Product, ProductFilters } from '../types/product.types'

export interface CreateProductData {
  name: string
  price: number
  stock: number
  category: string
  description?: string
}

const BASE = '/products'

export const productsApi = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams()
    if (filters?.category) params.set('category', filters.category)
    if (filters?.minPrice != null) params.set('min_price', String(filters.minPrice))
    if (filters?.maxPrice != null) params.set('max_price', String(filters.maxPrice))
    if (filters?.search) params.set('search', filters.search)
    if (filters?.limit != null) params.set('limit', String(filters.limit))
    if (filters?.offset != null) params.set('offset', String(filters.offset))
    const query = params.toString()
    const url = query ? `${BASE}/?${query}` : `${BASE}/`
    return apiClient.get<Product[]>(url)
  },

  async getProduct(id: number): Promise<Product> {
    return apiClient.get<Product>(`${BASE}/${id}`)
  },

  async createProduct(data: CreateProductData): Promise<Product> {
    return apiClient.post<Product>(BASE + '/', data)
  },

  async updateProduct(id: number, data: Partial<CreateProductData>): Promise<Product> {
    return apiClient.put<Product>(`${BASE}/${id}`, data)
  },

  async deleteProduct(id: number): Promise<void> {
    return apiClient.delete(`${BASE}/${id}`)
  },
}
