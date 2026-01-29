# Arquitectura Frontend (Módulo 4) — Feature-Based

## Estructura del proyecto

```
frontend/src/
├── features/
│   ├── Auth/
│   │   └── context/
│   │       └── AuthContext.tsx
│   ├── Products/
│   │   ├── components/
│   │   │   ├── ProductCard/
│   │   │   └── ProductList/
│   │   ├── hooks/
│   │   │   └── useProducts.ts
│   │   ├── pages/
│   │   │   └── ProductsPage.tsx
│   │   ├── services/
│   │   │   └── productsApi.ts
│   │   └── types/
│   │       └── product.types.ts
│   ├── Orders/   (por implementar)
│   └── Home/     (opcional: mover HomePage aquí)
├── shared/
│   ├── components/
│   │   └── Layout/
│   ├── hooks/
│   │   └── useLocalStorage.ts
│   ├── services/
│   │   └── apiClient.ts
│   └── types/
│       └── index.ts
├── pages/        (legacy; migrar a features/*/pages)
│   └── HomePage.tsx
├── App.tsx
└── main.tsx
```

## Cuándo usar cada capa

- **features/X/components**: componentes solo usados en la feature X.
- **features/X/pages**: páginas de la feature (rutas).
- **features/X/hooks**: hooks que usan estado o API de la feature.
- **features/X/services**: llamadas a API del dominio X (usan shared apiClient).
- **features/X/types**: interfaces y tipos del dominio X.
- **shared/components**: Layout, UI reutilizable (Button, Input, etc.).
- **shared/hooks**: useLocalStorage, etc., reutilizables en varias features.
- **shared/services**: apiClient global (axios, interceptors, token).

## Patrones aplicados (Módulo 4)

- **Compound components**: ProductCard con variantes (default, compact, detailed) si se extiende.
- **Custom hooks**: useProducts, useLocalStorage; futuros useOrders, useCart.
- **Context**: AuthContext para user/token/login/logout.
- **API**: productsApi usando apiClient; mismo patrón para orders, auth.
- **Optimización**: React.memo en ProductCard; useMemo/useCallback en ProductList.

## Prompts sugeridos para Cursor (Módulo 4)

1. **Migrar más páginas a features**  
   "Mueve la página X a features/X/pages y actualiza imports y rutas en App."

2. **Nueva feature**  
   "Crea la feature Cart con CartContext, useCart, CartPage y componentes CartItem y CartSummary. Usa useLocalStorage para persistir el carrito."

3. **Lazy loading**  
   "Añade lazy loading a las rutas de App con React.lazy y Suspense y un fallback LoadingSpinner."

4. **Tests**  
   "Añade tests con React Testing Library para ProductCard: renderizado, click en Ver Detalles y Agregar al Carrito."

## Rutas actuales

- `/` — HomePage
- `/products` — ProductsPage (feature Products)
- Pendientes: `/products/:id`, `/cart`, `/orders`, `/login`, etc.
