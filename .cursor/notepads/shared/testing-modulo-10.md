# Módulo 10: Testing Automatizado con Cursor AI

Resumen y prompts para configurar y generar tests con Cursor AI (unitarios, integración, E2E, CI/CD).

## Objetivos

- Configurar entornos de testing (Vitest/Jest + Testing Library en frontend, pytest en backend).
- Generar tests automáticamente con prompts efectivos.
- Tests unitarios robustos con alta cobertura.
- Tests de integración con mocks apropiados.
- Tests E2E (Cypress/Playwright) para flujos críticos.
- Automatizar testing en CI/CD (GitHub Actions).

## Herramientas en este proyecto

| Área      | Herramienta              | Uso                                      |
|----------|---------------------------|------------------------------------------|
| Frontend | Vitest                    | Tests unitarios e integración (Vite)     |
| Frontend | @testing-library/react    | Render y aserciones de componentes      |
| Frontend | @testing-library/jest-dom | Matchers (toBeInTheDocument, etc.)       |
| Frontend | jsdom                     | Entorno DOM para Vitest                  |
| Backend  | pytest                    | Tests unitarios e integración           |
| CI       | GitHub Actions            | backend.yml (pytest), frontend.yml (vitest) |

## Scripts (frontend)

- `pnpm test` — ejecutar tests una vez.
- `pnpm test:watch` — modo watch.
- `pnpm test:coverage` — cobertura (v8).

## Prompts efectivos

### Básicos

- "Genera tests unitarios para esta función considerando casos edge y errores"
- "Crea tests de integración para este módulo con mocks apropiados"
- "Desarrolla tests end-to-end para este flujo de usuario"

### Avanzados

```
Analiza esta función y genera tests que cubran:
- Casos normales de uso
- Casos extremos (edge cases)
- Manejo de errores
- Validación de tipos
- Performance con datasets grandes
```

### Para componentes React

- Usar `data-testid` en componentes para selecciones estables.
- Preferir `getByRole`, `getByLabelText`, `getByText` antes que `getByTestId`.
- Probar interacciones con `userEvent` (click, type).

### Para integración (mocks)

- Mock de API: `vi.mock('../api/userApi', () => ({ fetchUser: vi.fn(), ... }))`.
- Limpiar mocks en `beforeEach`: `vi.clearAllMocks()`.

## Estructura de tests en el proyecto

- **Frontend**
  - `src/test/setup.ts` — setup global (jest-dom).
  - `src/**/*.test.ts`, `src/**/*.spec.ts` — tests (vitest.config.ts).
  - Ejemplos: `shared/utils/cartUtils.test.ts`, `features/Products/components/ProductCard/ProductCard.test.tsx`.
- **Backend**
  - `tests/conftest.py` — fixtures (MockProductRepository).
  - `tests/products/application/test_create_product.py` — tests de use cases.

## CI/CD

- **Backend** (`.github/workflows/backend.yml`): checkout → setup Python → pip install → `pytest tests/ -v --tb=short`.
- **Frontend** (`.github/workflows/frontend.yml`): checkout → pnpm install → lint → **pnpm test** → build.

## Troubleshooting

| Problema       | Solución                                                |
|----------------|---------------------------------------------------------|
| Tests lentos   | Optimizar mocks y reducir dependencias externas         |
| Tests flaky    | Usar waitFor y aserciones más específicas                |
| Baja cobertura | Revisar coverage reports y añadir tests en áreas clave  |
| Tests complejos| Dividir en casos más pequeños y específicos             |

### Buenas prácticas

1. Usar **data-testid** para selecciones estables cuando sea necesario.
2. **Mockear dependencias** para aislar el código bajo prueba.
3. Tests **determinísticos**: evitar fechas/hora o datos aleatorios sin control.
4. **Limpieza** entre tests: `beforeEach` / `afterEach` para reset de mocks y estado.

## Archivos creados/actualizados (Módulo 10)

- `frontend/package.json` — scripts test, test:watch, test:coverage; devDeps: vitest, @vitest/coverage-v8, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, jsdom.
- `frontend/vitest.config.ts` — config Vitest (jsdom, setup, coverage).
- `frontend/src/test/setup.ts` — import jest-dom.
- `frontend/src/shared/utils/cartUtils.ts` — función `calculateTotal` (ejemplo para tests).
- `frontend/src/shared/utils/cartUtils.test.ts` — tests unitarios de calculateTotal.
- `frontend/src/features/Products/components/ProductCard/ProductCard.test.tsx` — tests de ProductCard.
- `.github/workflows/frontend.yml` — paso "Run tests" (pnpm test).
- `backend/requirements.txt` — eliminada línea duplicada de pytest.
