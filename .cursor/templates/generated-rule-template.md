# Mejores Prácticas de Implementación - Generated Rule

*Generated from successful conversation patterns on project development*

## Context
Esta regla se aplica en el contexto del desarrollo del proyecto e-commerce, donde se requiere consistencia en patrones de implementación, manejo de errores, logging estructurado y seguimiento de mejores prácticas arquitecturales. Es especialmente relevante para funciones que manejan datos críticos del negocio.

## Problem Solved
Esta regla soluciona patrones inconsistentes de implementación que pueden llevar a bugs, code smells o violaciones de las mejores prácticas del proyecto. Se activa cuando se detectan patrones específicos que requieren refactoring o mejora según los estándares establecidos.

## Trigger Conditions
**ACTIVATION:** Cuando se detectan patrones específicos que requieren implementación de mejores prácticas del proyecto.

## Solution Pattern

### ✅ RECOMMENDED APPROACH
- Validación de entrada con schemas (Pydantic / TypeScript types)
- Lógica de negocio con manejo de errores explícito
- Logging estructurado (sin datos sensibles)
- Respuestas consistentes: success/data o success/error con code y message

### ❌ PREVIOUS PROBLEMATIC APPROACH
- Código sin validación de entrada
- SQL por concatenación
- Errores silenciados o sin formato estándar
- Falta de tipos o JSDoc en funciones públicas

## Key Benefits
- **Consistencia**: Mantiene patrones uniformes en todo el proyecto
- **Calidad**: Reduce errores comunes mediante aplicación automática
- **Escalabilidad**: Facilita el mantenimiento y evolución del código
- **Onboarding**: Acelera la adaptación de nuevos desarrolladores

## Related Patterns
- Clean Architecture (backend)
- Feature-Based Architecture (frontend)
- API Design Standards
- Testing Patterns

## Implementation Checklist
- [ ] Definir contexto de activación específico
- [ ] Documentar patrones obligatorios y prohibidos
- [ ] Incluir ejemplos concretos del proyecto
- [ ] Validar aplicación en casos reales
- [ ] Integrar con sistema de versionado si aplica

---
*Esta regla fue generada a partir de patrones exitosos. Revisa y personaliza según los requisitos específicos de tu proyecto.*
