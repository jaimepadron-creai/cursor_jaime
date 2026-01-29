/**
 * Tests unitarios para calculateTotal (Módulo 10 - generados con Cursor AI).
 */
import { describe, test, expect } from 'vitest'
import { calculateTotal } from './cartUtils'

describe('calculateTotal', () => {
  test('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0)
  })

  test('should calculate total for single item', () => {
    const items = [{ price: 10 }]
    expect(calculateTotal(items)).toBe(10)
  })

  test('should calculate total for multiple items', () => {
    const items = [{ price: 10 }, { price: 20 }, { price: 30 }]
    expect(calculateTotal(items)).toBe(60)
  })

  test('should handle decimal prices', () => {
    const items = [{ price: 10.5 }, { price: 20.25 }]
    expect(calculateTotal(items)).toBeCloseTo(30.75)
  })

  test('should throw for null input', () => {
    expect(() => calculateTotal(null as unknown as { price: number }[])).toThrow('items must be an array')
  })

  test('should throw for undefined input', () => {
    expect(() => calculateTotal(undefined as unknown as { price: number }[])).toThrow('items must be an array')
  })

  test('should throw for non-array input', () => {
    expect(() => calculateTotal({ price: 10 } as unknown as { price: number }[])).toThrow('items must be an array')
  })
})
