# Design System - Guía de Referencia

Este proyecto usa **Ant Design (antd)** como biblioteca de componentes. Las convenciones siguientes complementan antd.

## Stack de UI
- **Biblioteca**: Ant Design 5.x
- **Iconos**: @ant-design/icons
- **Layout**: Ant Design Layout (Header, Content, Footer, Sider)
- **Temas**: Tokens de antd; personalización vía ConfigProvider si se necesita

## Tokens de Color (CSS Variables - uso opcional)
```css
:root {
  /* Primary - alineado con antd primary */
  --color-primary-50: #e6f4ff;
  --color-primary-500: #1677ff;
  --color-primary-900: #002c8c;

  /* Semantic */
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #ff4d4f;
}
```

## Componentes Base
- **Botones**: usar `<Button type="primary" | "default" | "dashed" | "link" />`, tamaños `size="large" | "middle" | "small"`
- **Inputs**: `<Input />`, `<InputNumber />`, `<Select />` de antd
- **Layout**: `<Layout>`, `<Layout.Header />`, `<Layout.Content />`, `<Layout.Footer />`
- **Navegación**: `<Menu />` de antd para header/sidebar

## Espaciado
- Consistir con antd: 8px base (8, 16, 24, 32)
- Contenedores: `padding: 24px 50px` en Content (como en App actual); en móvil reducir

## Tipografía
- Usar tipografía por defecto de antd
- Títulos: `Typography.Title`, cuerpos: `Typography.Text` / `Typography.Paragraph`

## Path Aliases (frontend)
- `@` → `./src`
- `@shared` → `./src/shared`
- `@features` → `./src/features` (si se usa)

## Estructura de componentes de UI
- Componentes compartidos en `frontend/src/shared/components/`
- Layout en `shared/components/Layout/` (Header, etc.)
- Páginas en `frontend/src/pages/`
