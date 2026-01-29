# Módulo 11: Integración con MCP (Model Context Protocol)

Resumen y guía para configurar MCPs nativos y personalizados, integrando herramientas y APIs con Cursor AI.

## Objetivos

- Comprender la arquitectura MCP y su importancia en el futuro del desarrollo.
- Configurar MCPs nativos (Playwright, Database, Git) para extender capacidades de Cursor AI.
- Desarrollar MCPs personalizados para APIs internas y monitoreo.
- Orquestar un ecosistema integrado de herramientas y servicios.
- Implementar debugging avanzado para MCPs en producción.

## ¿Qué es MCP?

Model Context Protocol (MCP) es un protocolo estándar abierto desarrollado por Anthropic que permite a modelos de IA interactuar de forma nativa y segura con herramientas externas, APIs, bases de datos y servicios cloud mediante una arquitectura de conectores estandarizados.

### Beneficios

- **Unificación**: Un protocolo estándar para integrar cualquier herramienta con IA.
- **Extensibilidad**: Capacidad de crear integraciones personalizadas sin vendor lock-in.
- **Future-Proofing**: Arquitectura preparada para la próxima generación de agentes AI.
- **Ventaja Competitiva**: Workflows que serán estándar en 2-3 años, implementados hoy.

## Configuración de MCPs Nativos

### MCP de Playwright

Para testing automatizado E2E:

```json
{
  "playwright": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-playwright"],
    "env": {
      "PLAYWRIGHT_BASE_URL": "http://localhost:3000"
    }
  }
}
```

### MCP de Base de Datos (PostgreSQL)

Para consultas directas a la base de datos:

```json
{
  "database": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-postgres"],
    "env": {
      "DATABASE_URL": "postgresql://user:pass@localhost:5432/ecommerce"
    }
  }
}
```

### MCP de Git

Para operaciones de Git automatizadas:

```json
{
  "git": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-git"],
    "env": {
      "GIT_REPO_PATH": "."
    }
  }
}
```

## MCPs Personalizados en este Proyecto

### 1. Internal API Server (`mcp-servers/src/internal-api-server.ts`)

Herramientas disponibles:

- **get_products**: Obtener lista de productos (con filtros opcionales: category, limit)
- **get_product_by_id**: Obtener un producto específico por ID
- **get_metrics**: Obtener métricas de salud de la API

**Uso con Cursor AI:**
- "Obtén la lista de productos usando el MCP de API interna"
- "Consulta el producto con ID 1 usando el MCP"
- "Verifica las métricas de la API interna"

### 2. Monitoring Server (`mcp-servers/src/monitoring-server.ts`)

Herramientas disponibles:

- **get_system_health**: Estado general del sistema (API, base de datos)
- **check_api_status**: Verificar estado de la API
- **get_performance_metrics**: Métricas de rendimiento (response time, throughput, error rate)
- **create_alert**: Crear alertas de monitoreo (simulado - para integración futura)

**Uso con Cursor AI:**
- "Verifica el estado de salud del sistema usando el MCP de monitoreo"
- "Obtén las métricas de rendimiento de la última hora"
- "Crea una alerta para monitorear el tiempo de respuesta de la API"

## Configuración Master

Archivo: `.cursor/mcp-settings.json`

Contiene la configuración de todos los MCPs (nativos y personalizados). Cursor AI lee este archivo para inicializar los servidores MCP.

## Instalación y Compilación

### MCPs Personalizados

```bash
cd mcp-servers
npm install
npm run build
```

Los archivos compilados se generan en `mcp-servers/dist/`.

## Workflow Integrado con MCP

Con MCP configurado, Cursor AI puede:

1. **Analizar código** y ejecutar tests automáticamente con Playwright MCP
2. **Consultar la base de datos** para entender el estado actual (Database MCP)
3. **Hacer commits inteligentes** usando Git MCP
4. **Monitorear el sistema** y crear alertas automáticamente (Monitoring MCP)
5. **Consultar APIs internas** para obtener datos en tiempo real (Internal API MCP)
6. **Desplegar servicios** cuando los tests pasan (futuro)

## Debugging y Troubleshooting

### Problemas Comunes

| Problema | Solución |
|----------|----------|
| **Conexión Fallida** | Verifica que el servidor MCP esté ejecutándose correctamente |
| **Permisos** | Configura las variables de entorno y credenciales necesarias |
| **Performance** | Optimiza las consultas y limita el scope de las operaciones |
| **Compatibilidad** | Asegúrate de usar versiones compatibles de los MCPs |

### Comandos de Diagnóstico

```bash
# Verificar estado de MCPs (si Cursor expone estos comandos)
cursor --mcp-status

# Ver logs de MCPs
cursor --mcp-logs

# Test de conectividad
cursor --mcp-test-connection [mcp-name]
```

### Verificación Manual

1. **Verificar configuración**: Revisa `.cursor/mcp-settings.json` para sintaxis correcta.
2. **Verificar servidores**: Asegúrate de que los MCPs personalizados estén compilados (`mcp-servers/dist/`).
3. **Verificar variables de entorno**: Confirma que `INTERNAL_API_URL`, `MONITORING_API_URL`, `DATABASE_URL`, etc. estén configuradas.
4. **Verificar dependencias**: Para MCPs nativos, asegúrate de tener Node.js y npm/npx disponibles.

## Desarrollo de Nuevos MCPs

Para crear un nuevo MCP personalizado:

1. Crea un nuevo archivo en `mcp-servers/src/`
2. Implementa el servidor usando `@modelcontextprotocol/sdk`:
   ```typescript
   import { Server } from '@modelcontextprotocol/sdk/server/index.js'
   import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
   ```
3. Define herramientas con `ListToolsRequestSchema` y `CallToolRequestSchema`
4. Compila con `npm run build` en `mcp-servers/`
5. Añade la configuración en `.cursor/mcp-settings.json`

## Archivos Creados (Módulo 11)

- `.cursor/mcp-settings.json` — Configuración master de todos los MCPs
- `mcp-servers/package.json` — Dependencias y scripts para MCPs personalizados
- `mcp-servers/tsconfig.json` — Configuración TypeScript para compilación
- `mcp-servers/src/internal-api-server.ts` — MCP para API interna del proyecto
- `mcp-servers/src/monitoring-server.ts` — MCP para monitoreo y alertas
- `mcp-servers/README.md` — Documentación de los MCPs personalizados

## Próximos Pasos

- Integrar MCPs con sistemas de alertas reales (PagerDuty, Slack, etc.)
- Añadir MCPs para servicios cloud (AWS, GCP, Azure)
- Crear MCPs para CI/CD pipelines (GitHub Actions, GitLab CI)
- Implementar MCPs para bases de datos adicionales (MongoDB, Redis)

## Impacto Empresarial

Las empresas que adoptan MCP temprano reportan:
- Incrementos de productividad del 400-500%
- Reducción de friction entre herramientas del 90%
- Arquitecturas future-proof preparadas para la próxima generación de IA
