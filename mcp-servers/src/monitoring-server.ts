/**
 * MCP Server para Monitoreo (Módulo 11 - MCP personalizado).
 * Permite a Cursor AI consultar métricas de salud del sistema y crear alertas.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import type {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const MONITORING_API_URL = process.env.MONITORING_API_URL || 'http://localhost:8000/api/health'

const server = new Server(
  {
    name: 'monitoring-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Listar herramientas de monitoreo
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_system_health',
        description: 'Obtener métricas de salud del sistema (API, base de datos, etc.)',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'check_api_status',
        description: 'Verificar el estado de la API backend',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_performance_metrics',
        description: 'Obtener métricas de rendimiento (response time, throughput)',
        inputSchema: {
          type: 'object',
          properties: {
            timeRange: {
              type: 'string',
              description: 'Rango de tiempo (last_hour, last_day, last_week)',
              enum: ['last_hour', 'last_day', 'last_week'],
            },
          },
        },
      },
      {
        name: 'create_alert',
        description: 'Crear una alerta de monitoreo (simulado - para integración futura)',
        inputSchema: {
          type: 'object',
          properties: {
            service: {
              type: 'string',
              description: 'Nombre del servicio a monitorear',
            },
            threshold: {
              type: 'number',
              description: 'Umbral para la alerta',
            },
            condition: {
              type: 'string',
              description: 'Condición de la alerta (gt, lt, eq)',
              enum: ['gt', 'lt', 'eq'],
            },
            metric: {
              type: 'string',
              description: 'Métrica a monitorear (response_time, error_rate, etc.)',
            },
          },
          required: ['service', 'threshold', 'condition', 'metric'],
        },
      },
    ],
  }
})

// Manejar llamadas a herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    switch (name) {
      case 'get_system_health': {
        const healthUrl = MONITORING_API_URL.replace('/api/health', '/api/health')
        let health
        let dbStatus = 'unknown'

        try {
          const response = await fetch(healthUrl, { signal: AbortSignal.timeout(5000) })
          health = response.ok ? await response.json() : { status: 'unavailable' }
          dbStatus = health.database === 'connected' ? 'connected' : 'disconnected'
        } catch (error) {
          health = { status: 'error', message: error instanceof Error ? error.message : String(error) }
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  timestamp: new Date().toISOString(),
                  api: {
                    status: health.status || 'unknown',
                    url: MONITORING_API_URL,
                  },
                  database: {
                    status: dbStatus,
                  },
                  overall: dbStatus === 'connected' && health.status === 'ok' ? 'healthy' : 'degraded',
                },
                null,
                2
              ),
            },
          ],
        }
      }

      case 'check_api_status': {
        try {
          const response = await fetch(MONITORING_API_URL, { signal: AbortSignal.timeout(5000) })
          const data = response.ok ? await response.json() : null

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    status: response.ok ? 'online' : 'offline',
                    statusCode: response.status,
                    data,
                    timestamp: new Date().toISOString(),
                  },
                  null,
                  2
                ),
              },
            ],
          }
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    status: 'error',
                    message: error instanceof Error ? error.message : String(error),
                    timestamp: new Date().toISOString(),
                  },
                  null,
                  2
                ),
              },
            ],
          }
        }
      }

      case 'get_performance_metrics': {
        const timeRange = (args?.timeRange as string) || 'last_hour'

        // Simulación de métricas (en producción, esto vendría de un sistema de monitoreo real)
        const metrics = {
          timeRange,
          responseTime: {
            avg: 120,
            p50: 100,
            p95: 250,
            p99: 500,
            unit: 'ms',
          },
          throughput: {
            requestsPerSecond: 45,
            totalRequests: timeRange === 'last_hour' ? 162000 : 864000,
          },
          errorRate: {
            percentage: 0.1,
            totalErrors: 162,
          },
          timestamp: new Date().toISOString(),
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(metrics, null, 2),
            },
          ],
        }
      }

      case 'create_alert': {
        const service = args?.service as string
        const threshold = args?.threshold as number
        const condition = args?.condition as string
        const metric = args?.metric as string

        // Simulación de creación de alerta (en producción, esto se integraría con un sistema de alertas)
        const alert = {
          id: `alert-${Date.now()}`,
          service,
          metric,
          threshold,
          condition,
          status: 'active',
          createdAt: new Date().toISOString(),
          message: `Alert created: ${service} ${metric} ${condition} ${threshold}`,
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(alert, null, 2),
            },
          ],
        }
      }

      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    }
  }
})

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Monitoring MCP Server running')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
