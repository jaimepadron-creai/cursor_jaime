# ADR-002: UI con Ant Design (antd)

## Status
**Aceptado** — Proyecto E-commerce Evolution

## Contexto
Se necesitaba una biblioteca de componentes para:
- Layout (Header, Content, Footer)
- Formularios, tablas, botones, mensajes
- Consistencia visual y accesibilidad base
- Menos tiempo en estilos desde cero

## Decisión
Usar **Ant Design 5.x** como biblioteca principal de UI en el frontend.

## Justificación
- Componentes listos para uso (Layout, Menu, Form, Table, Button, message, etc.)
- Buena integración con React y TypeScript
- Temas y tokens configurables
- Documentación y comunidad amplias
- Menos dependencia de CSS custom en fases iniciales

## Consecuencias
- **Positivas**: Desarrollo rápido, UI consistente, menos código de presentación
- **Negativas**: Tamaño de bundle; posible sustitución por componentes propios más adelante si se prioriza tamaño

## Implementación
- `frontend`: dependencias `antd`, `@ant-design/icons`
- Layout actual con `Layout`, `Layout.Header`, `Layout.Content`, `Layout.Footer`
- Componentes compartidos en `shared/components/` que usan antd cuando aplica

**Revisión**: Valorar si añadir Tailwind para utilidades o mantener solo antd.
