/**
 * Utilidades de carrito (Módulo 10 - función para tests unitarios de ejemplo).
 */

export interface CartItemPrice {
  price: number
}

/**
 * Calcula el total de una lista de ítems por su precio.
 * @param items - Lista de ítems con propiedad price
 * @returns Suma de precios
 */
export function calculateTotal(items: CartItemPrice[]): number {
  if (items == null || !Array.isArray(items)) {
    throw new TypeError('items must be an array')
  }
  return items.reduce((total, item) => total + item.price, 0)
}
