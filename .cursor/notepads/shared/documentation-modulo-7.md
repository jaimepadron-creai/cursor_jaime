# Documentación y Reglas Persistentes (Módulo 7)

## Resumen del Módulo 7

**Tema:** Documentación y reglas persistentes: systems avanzados de Rules jerárquicas, versionado de reglas, conversión de conversaciones en reglas, documentación automática (JSDoc, OpenAPI), mantenimiento de wikis y bases de conocimiento.

**Objetivos:** Mantener consistencia arquitectural con rules evolutivas, versionado en Git, convertir conversaciones exitosas en reglas reutilizables, automatizar documentación de código y APIs, y mantener docs y wikis actualizados.

---

## Estructura implementada (Módulo 7)

### Rules evolutivas

```
.cursor/rules/
├── global/
│   ├── 00-core-principles.md    # Principios inmutables, type safety, security, error handling
│   └── 01-architecture-patterns.md  # Feature-based, Clean Architecture, REST
├── domain/
│   └── auth/
│       └── authentication-rules.md  # JWT, protected routes, security checklist
├── (existentes) global.mdc, frontend.mdc, backend.mdc, testing.mdc, patterns/*.mdc
```

### Configuración

- **.cursor/config/rules-versioning.json**: versionado semántico de reglas, triggers (major/minor/patch), integración Git opcional.
- **.cursor/config/documentation.json**: auto-documentación (JSDoc, OpenAPI, decision records), triggers y outputs.
- **.cursor/config/wiki-automation.json**: fuentes de contenido para wiki (código, docs, memories), estructura de wiki; habilitado en false por defecto.

### Plantilla

- **.cursor/templates/generated-rule-template.md**: plantilla para generar reglas a partir de conversaciones exitosas (contexto, problema, solución, checklist).

### Documentación del proyecto

- **docs/api/README.md**: resumen de la API (endpoints productos, health, formato de respuesta).
- **docs/architecture/README.md**: visión general, estructura del repo, enlace a ADRs.
- **docs/development/README.md**: setup local, Docker, estándares, enlaces a rules y notepads.
- **docs/troubleshooting/README.md**: reglas/contexto Cursor, backend, frontend, DevOps.

---

## Cómo usar las reglas evolutivas

- Los archivos en `.cursor/rules/global/` y `.cursor/rules/domain/` son **referencia en Markdown**; Cursor puede usarlos vía @Docs o incluidos en contexto.
- Las **reglas que Cursor aplica por archivo** siguen en `.cursor/rules/*.mdc` (global.mdc, frontend.mdc, etc.) con frontmatter `globs` y `alwaysApply`.
- Para **convertir una conversación en regla**: usar la plantilla en `.cursor/templates/generated-rule-template.md`, rellenar contexto y solución, y guardar en `.cursor/rules/` (global, domain o technical según corresponda).

---

## Prompts sugeridos para Cursor (Módulo 7)

1. **Documentar función**: "Genera JSDoc completo para esta función: @Files: <ruta>. Incluye parámetros, retorno, ejemplos de uso y edge cases."
2. **Documentar API**: "Genera documentación OpenAPI para estos endpoints: @Files: backend/src/products/api.py. Incluye descripción, parámetros, response schemas y ejemplos."
3. **Crear regla desde conversación**: "A partir de esta solución, crea una regla reutilizable usando la plantilla en .cursor/templates/generated-rule-template.md y guárdala en .cursor/rules/domain/<dominio>/."
4. **Actualizar docs**: "Actualiza docs/development/README.md con los comandos actuales de setup y las rutas de .cursor que hemos definido."

---

## Validación y mantenimiento

- **Rules**: revisar que no haya conflicto entre reglas (global vs domain vs technical); usar versionado (rules-versioning.json) para cambios importantes.
- **Docs**: mantener docs/api, docs/architecture, docs/development y docs/troubleshooting alineados con el código; enlazar a .cursor/notepads y .cursor/memories cuando ayude.
- **Wiki/automation**: si se habilita wiki-automation, configurar content_sources y wiki_structure según el repo.
