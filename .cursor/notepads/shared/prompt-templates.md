# Plantillas de Prompts (Módulo 3)

## Template de Prompt Profesional

Usar esta estructura al pedir código en Composer (⌘I):

```markdown
## Contexto
[Descripción clara del estado actual y objetivo]

## Requerimientos Técnicos
- **Stack**: [Tecnologías específicas: React, FastAPI, antd, etc.]
- **Patrones**: [Convenciones del proyecto: ver .cursor/rules y notepads]
- **Performance**: [Requisitos específicos si aplica]
- **Compatibilidad**: [Navegadores, devices, etc. si aplica]

## Referencias
- **Código similar**: @Files: [archivos relevantes del proyecto]
- **Documentación**: @Docs: [guías internas en .cursor/notepads]
- **Ejemplos**: [código existente a seguir]

## Criterios de Éxito
- [ ] Funcionalidad core implementada
- [ ] Sigue patrones establecidos del proyecto
- [ ] Incluye manejo de errores
- [ ] Tipos TypeScript / type hints correctos
- [ ] Tests incluidos si aplica

## Consideraciones Especiales
[Edge cases, optimizaciones, restricciones específicas]
```

---

## Few-Shot: dar ejemplos del proyecto

Cuando pidas un nuevo hook, componente o función, incluir 1–2 ejemplos de código **ya existente en el proyecto** para que la IA replique estilo y patrones.

Ejemplo de frase para el prompt:

> "Necesito un [X] que siga exactamente los mismos patrones que nuestros [Y] existentes. Ejemplos: @Files: [ruta a archivo similar]. Requisitos: [lista breve]."

---

## Chain-of-Thought: problemas complejos

Para optimización, refactors grandes o diseño de arquitectura, pedir por pasos:

1. **Paso 1: Análisis** — "Analiza [archivos] e identifica [bottlenecks / problemas]. Lista hallazgos."
2. **Paso 2: Estrategia** — "Basado en el análisis, propón orden de implementación y trade-offs."
3. **Paso 3: Implementación** — "Implementa la versión [optimizada/nueva] con [requisitos]."
4. **Paso 4: Validación** — "Indica cómo validar (métricas, tests, profiling)."

Ejemplo de inicio de prompt:

> "Necesito [objetivo]. Trabajemos por pasos. Paso 1: analiza @Files: [X] e identifica [Y]. Empecemos con el Paso 1."

---

## Anatomía de un prompt efectivo

- **Contexto**: situación actual + objetivo concreto.
- **Especificaciones técnicas**: stack, patrones, rendimiento, compatibilidad.
- **Referencias**: @Files, @Docs, ejemplos de código.
- **Criterios de éxito**: qué debe hacer, cómo debe hacerlo, cómo se verifica.

Evitar: prompts vagos ("mejora esto"), o incluir decenas de archivos sin foco. Usar selección precisa o @Files en archivos concretos.
