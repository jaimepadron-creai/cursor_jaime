# Flujo de Trabajo y Prompting (Módulo 3)

## Cuándo usar Inline Edit (⌘K) vs Composer (⌘I)

| Herramienta   | Usar para                                                                 |
|---------------|---------------------------------------------------------------------------|
| **Inline Edit (⌘K)** | Transformaciones concretas, refactors locales, correcciones puntuales, optimizaciones en un archivo/función, conversiones (callbacks→async/await, clases→hooks). Seleccionar solo el código a cambiar. |
| **Composer (⌘I)**  | Código nuevo, diseño de arquitectura, tareas multi-paso, documentación, planificación de features, análisis + implementación en varios archivos. |

---

## Ciclo óptimo: Prompt → Revisión → Aplicación

### Antes de aplicar cambios generados por IA

**Calidad de código**
- [ ] ¿Sigue los patrones del proyecto? (reglas en `.cursor/rules/`)
- [ ] ¿Tipos TypeScript / type hints correctos?
- [ ] ¿Manejo de errores adecuado?
- [ ] ¿Código legible y mantenible?

**Validación funcional**
- [ ] ¿Resuelve el problema planteado?
- [ ] ¿Cumple todos los requisitos?
- [ ] ¿Maneja edge cases?
- [ ] ¿Es la solución adecuada (no overkill ni incompleta)?

---

## Anti-patrones a evitar

- **Prompts vagos**: en vez de "mejora este código", especificar qué mejorar (ej. "optimiza re-renders con React.memo y useCallback").
- **Sobrecarga de contexto**: no pedir "arregla todos los bugs" con 50 archivos; usar @Files en los archivos concretos con el bug identificado.
- **Aceptar sin revisar**: revisar siempre el diff; probar el código; comprobar que sigue convenciones y que no introduce vulnerabilidades.

---

## Casos donde NO depender de la IA sin supervisión

| Escenario                      | Enfoque recomendado                                        |
|--------------------------------|-------------------------------------------------------------|
| Lógica crítica de seguridad   | Diseño humano + IA solo para implementación; revisión experta. |
| Algoritmos de dominio específico | Especificar requisitos y casos exactos; validar salidas.     |
| Aprendizaje fundamental       | Usar IA como tutor (explicaciones), no como solucionador total. |

---

## Métricas de efectividad (referencia)

- **Acceptance rate**: > 80% de sugerencias aceptadas sin modificación.
- **Iteraciones**: < 3 prompts de media por tarea completada.
- **Tiempo**: < 10 min para tareas estándar.
- **Calidad**: revisión post-aplicación > 8/10.

---

## Troubleshooting rápido

- **Prompts no dan buen resultado**: comprobar contexto (archivos abiertos, @Files); ser más específico; dividir en pasos (chain-of-thought).
- **Conversación incoherente**: reiniciar chat en Composer; re-establecer contexto y requisitos en el primer mensaje.
- **Código no sigue patrones**: asegurar que las reglas en `.cursor/rules/` están bien; referenciar @Docs o @Files con ejemplos del proyecto en el prompt.
