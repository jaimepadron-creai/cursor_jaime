# Troubleshooting — Configuración Cursor (Módulo 2)

## 7. Probar y depurar

### Si las reglas no se aplican

1. **Revisar sintaxis de reglas**
   - Archivos `.mdc` deben tener frontmatter YAML válido entre `---` y `---`.
   - Opciones soportadas: `alwaysApply: true|false`, `globs: "patrón"` o lista de patrones.
   - No usar el formato antiguo `**TRIGGER:**` en el cuerpo; usar `globs` en el frontmatter.

2. **Revisar globs**
   - Los globs son relativos a la raíz del proyecto (o al workspace root).
   - Ejemplos válidos: `**/*.tsx`, `**/src/**/*.py`, `frontend/**/*.tsx`.
   - Si una regla no se activa al abrir un archivo, comprobar que el path del archivo coincide con algún glob.

3. **Comprobar jerarquía**
   - `global.mdc` con `alwaysApply: true` se aplica siempre.
   - Las reglas con `globs` y `alwaysApply: false` solo se aplican cuando el archivo coincide.
   - Si hay conflicto, prevalece: Auto-Attach > User > Project > global.

4. **Validar reglas (si tu versión de Cursor lo soporta)**
   ```bash
   cursor --validate-rules .cursor/rules/
   ```
   Si el comando no existe, revisar manualmente la sintaxis YAML y los globs.

### Si el contexto falla

1. **Revisar `.cursorignore`**
   - Crea en la **raíz del proyecto** un archivo `.cursorignore` si no existe.
   - Los archivos y carpetas listados en `.cursorignore` no se envían como contexto.
   - Contenido sugerido (raíz del repo):
     ```
     node_modules/
     **/node_modules/
     dist/
     build/
     .output/
     .astro/
     .env
     .env.*
     *.log
     *.min.js
     coverage/
     .vscode/
     .idea/
     .DS_Store
     course-website/node_modules/
     course-website/dist/
     ```
   - Si falta algo relevante (ej. un módulo compartido), no debe estar ignorado.
   - Si sobra algo (node_modules, dist, .env), debe estar en `.cursorignore` para no gastar contexto.

2. **Ver contexto actual (si tu versión lo soporta)**
   ```bash
   cursor --show-context
   ```
   Si el comando no existe, confiar en la UI de Cursor (archivos referenciados en el chat) y en `.cursorignore`.

3. **Optimizar contexto**
   - Usar `@Files` para incluir solo los archivos necesarios.
   - Mantener `max_context_files` razonable en `config/context-settings.json` (ej. 20).
   - Excluir en `.cursorignore` carpetas grandes o no relevantes (node_modules, dist, lockfiles si no se necesitan).

### Max Mode no funciona como esperas

- Revisar `config/max-mode.json`: `enabled`, `scope_limits.max_files`, `exclude_patterns`.
- Confirmar que el proyecto no excede `max_files` y que los archivos que quieres incluir no están en `exclude_patterns`.
- Revisar también exclusiones en `.cursorignore`.

### Referencias

- Reglas: `.cursor/rules/` (global.mdc, frontend.mdc, backend.mdc, testing.mdc, patterns/*.mdc).
- Config: `.cursor/config/` (models.json, context-settings.json, max-mode.json, workspace.json).
- Documentación oficial Cursor para reglas y contexto cuando esté disponible.
