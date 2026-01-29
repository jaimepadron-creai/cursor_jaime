# MCP Servers Personalizados (Módulo 11)

Servidores MCP (Model Context Protocol) personalizados para integrar APIs internas y monitoreo con Cursor AI.

## Servidores Incluidos

### 1. Internal API Server (`internal-api-server.ts`)

Permite a Cursor AI interactuar con la API backend del proyecto:

- **get_products**: Obtener lista de productos (con filtros opcionales)
- **get_product_by_id**: Obtener un producto específico por ID
- **get_metrics**: Obtener métricas de salud de la API

### 2. Monitoring Server (`monitoring-server.ts`)

Permite consultar métricas y crear alertas:

- **get_system_health**: Estado general del sistema (API, base de datos)
- **check_api_status**: Verificar estado de la API
- **get_performance_metrics**: Métricas de rendimiento (response time, throughput)
- **create_alert**: Crear alertas de monitoreo

## Instalación

```bash
cd mcp-servers
npm install
npm run build
```

## Configuración

Los servidores se configuran en `.cursor/mcp-settings.json`:

```json
{
  "mcps": {
    "internal-api": {
      "command": "node",
      "args": ["mcp-servers/dist/internal-api-server.js"],
      "env": {
        "INTERNAL_API_URL": "http://localhost:8000"
      }
    },
    "monitoring": {
      "command": "node",
      "args": ["mcp-servers/dist/monitoring-server.js"],
      "env": {
        "MONITORING_API_URL": "http://localhost:8000/api/health"
      }
    }
  }
}
```

## Uso

Una vez configurados en Cursor, puedes usar prompts como:

- "Obtén la lista de productos usando el MCP de API interna"
- "Verifica el estado de salud del sistema usando el MCP de monitoreo"
- "Crea una alerta para monitorear el tiempo de respuesta de la API"

## Desarrollo

Para desarrollar nuevos MCPs:

1. Crea un nuevo archivo en `src/`
2. Implementa el servidor usando `@modelcontextprotocol/sdk`
3. Compila con `npm run build`
4. Añade la configuración en `.cursor/mcp-settings.json`
