# Módulo 9: Generación de UI desde Mockups y Wireframes

Resumen y prompts para usar Cursor AI en análisis visual, OCR de sketches y debugging visual.

## Objetivos

- Dominar el reconocimiento visual de Cursor AI (mockups, wireframes, sketches).
- Configurar el proyecto para análisis visual (tipos `design.ts`, dependencias opcionales).
- Implementar OCR para digitalizar sketches y generar código React.
- Debugging visual: comparar capturas con diseños originales.
- Generar componentes y documentación desde diseños.

## Tipos del proyecto (design.ts)

Ubicación: `frontend/src/shared/types/design.ts`

- **MockupAnalysis**: componentes, layout, assets, interactions.
- **ComponentMeta**: type, properties, position, styling.
- **DebuggingReport**: issues (layout, color, responsive, etc.) y suggestions.
- **ProjectUISummary**, **UIOptimizations**, **PerformanceMetrics** para reportes.

## Prompts útiles

### Análisis de dependencias

```
Analiza este proyecto y genera un reporte de dependencias:
- Dependencias externas (npm packages)
- Dependencias internas (imports entre archivos)
- Dependencias circulares (si existen)
- Sugerencias de optimización
- Métricas de acoplamiento
Formato: Lista estructurada con explicaciones
```

### Análisis de mockup

```
Analiza este mockup y extrae:
- Estructura de componentes
- Jerarquía visual
- Patrones de diseño utilizados
- Variables de color y tipografía
- Estados interactivos
Genera código React con TypeScript optimizado.
```

### OCR / Sketch a código

```
Analiza esta imagen de sketch/wireframe y extrae:
1. Texto visible (labels, botones, títulos)
2. Elementos de UI (formularios, botones, navegación)
3. Layout y estructura (grid, flexbox, posicionamiento)
4. Elementos visuales (iconos, imágenes, decoraciones)
Luego genera código React basado en lo identificado.
Incluye comentarios explicando cada elemento reconocido.
```

### Mejorar componente desde sketch

```
Analiza este sketch más detalladamente y genera:
- TypeScript interfaces para los datos del formulario
- Validación de campos con mensajes de error
- Estados de loading y error
- Animaciones de transición
- Responsive design para móvil
- Tests unitarios para el componente
Incluye comentarios explicando cada mejora implementada.
```

### Debugging visual (captura vs mockup)

```
Analiza esta captura de pantalla y compara con el mockup original:
Identifica:
1. Diferencias de layout (posicionamiento, espaciado)
2. Problemas de color (hex codes incorrectos)
3. Elementos faltantes o extra
4. Problemas de responsive design
5. Errores de tipografía
6. Problemas de accesibilidad
Genera un reporte con sugerencias de corrección específicas.
```

### Análisis responsive

```
Analiza esta captura de pantalla en diferentes tamaños de pantalla:
Verifica layout en móvil (320px-768px), tablet (768px-1024px), desktop (1024px+).
Identifica problemas de responsive y genera media queries para corregirlos.
```

### Resumen del proyecto

```
Genera un resumen completo del proyecto:
- Lista de componentes generados desde mockups
- Optimizaciones implementadas
- Métricas de rendimiento alcanzadas
- Documentación generada
- Próximos pasos recomendados
Formato: Reporte estructurado con código de ejemplo
```

## Dependencias sugeridas (opcional)

Para análisis visual y export (screenshots/PDF):

- **Dev**: `html2canvas`, `jspdf` (ya añadidas en package.json).
- **Opcional**: `lucide-react`, `framer-motion` para iconos y animaciones.
- Si usas Tailwind: `@tailwindcss/forms`, `@tailwindcss/typography`.

## Flujo de trabajo

1. **Mockup**: Subir imagen al editor → prompt de análisis → generar componentes.
2. **Sketch**: Subir sketch → prompt OCR → generar React (formularios, layout).
3. **Debugging**: Subir captura + mockup → prompt comparación → aplicar correcciones (espaciado, colores, hover, responsive).
4. **Documentación**: Usar tipos `DebuggingReport`, `ProjectUISummary`, `UIOptimizations` para reportes generados por Cursor.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Imágenes borrosas | Usar imágenes alta resolución (mín. 1920px de ancho). |
| Texto no reconocido | Mejorar contraste entre texto y fondo. |
| Componentes incorrectos | Proporcionar mockups más detallados con especificaciones. |
| Estilos inconsistentes | Definir design system antes del análisis visual. |

- Usar formatos PNG o SVG.
- Añadir anotaciones sobre interacciones especiales.
- Proporcionar contexto del propósito de cada componente.
- Revisar siempre el código generado.

## Archivos creados en este módulo

- `frontend/src/shared/types/design.ts` — Tipos para análisis y reportes.
- `frontend/src/features/Auth/components/LoginForm/LoginForm.tsx` — Ejemplo generado desde sketch (login).
- `frontend/src/features/Auth/pages/LoginPage.tsx` — Página /login.
- Mejoras en `ProductCard`: espaciado (p-6), hover, CTA con estilos claros.
- Ruta `/login` en App; `AuthProvider` en main.tsx.
- DevDependencies: html2canvas, jspdf.
