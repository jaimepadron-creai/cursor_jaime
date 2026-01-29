/**
 * Tests unitarios para ProductCard (Módulo 10 - Testing Library).
 */
import { describe, test, expect, vi } from 'vitest'
import { render, screen, userEvent } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import type { Product } from '../../types/product.types'

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'Electronics',
  stock: 10,
}

describe('ProductCard', () => {
  test('renders product name and price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  test('renders product description when provided', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  test('applies product-card class to container', () => {
    const { container } = render(<ProductCard product={mockProduct} />)
    const card = container.querySelector('.product-card')
    expect(card).toBeInTheDocument()
  })

  test('calls onAddToCart when "Agregar al Carrito" is clicked', async () => {
    const onAddToCart = vi.fn()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)
    await userEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }))
    expect(onAddToCart).toHaveBeenCalledTimes(1)
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  test('calls onViewDetails when "Ver Detalles" is clicked', async () => {
    const onViewDetails = vi.fn()
    render(<ProductCard product={mockProduct} onViewDetails={onViewDetails} />)
    await userEvent.click(screen.getByRole('button', { name: /ver detalles/i }))
    expect(onViewDetails).toHaveBeenCalledTimes(1)
    expect(onViewDetails).toHaveBeenCalledWith(mockProduct)
  })

  test('does not render action buttons when callbacks are not provided', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.queryByRole('button', { name: /agregar al carrito/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /ver detalles/i })).not.toBeInTheDocument()
  })

  test('renders image when imageUrl is provided', () => {
    const productWithImage = { ...mockProduct, imageUrl: 'https://example.com/img.png' }
    render(<ProductCard product={productWithImage} />)
    const img = screen.getByRole('img', { name: 'Test Product' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/img.png')
  })

  test('handles product without description', () => {
    const productNoDesc = { ...mockProduct, description: '' }
    render(<ProductCard product={productNoDesc} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.queryByText('Test description')).not.toBeInTheDocument()
  })
})
