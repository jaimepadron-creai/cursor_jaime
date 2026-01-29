/**
 * MCP Server para API Interna (Módulo 11 - MCP personalizado).
 * Permite a Cursor AI interactuar con la API backend del proyecto e-commerce.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import type {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const INTERNAL_API_URL = process.env.INTERNAL_API_URL || 'http://localhost:8000'

const server = new Server(
  {
    name: 'internal-api-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Listar herramientas disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_products',
        description: 'Obtener lista de productos desde la API interna',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filtrar por categoría (opcional)',
            },
            limit: {
              type: 'number',
              description: 'Límite de resultados (opcional)',
            },
          },
        },
      },
      {
        name: 'get_product_by_id',
        description: 'Obtener un producto específico por ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'ID del producto',
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'get_metrics',
        description: 'Obtener métricas de la API (health, performance)',
        inputSchema: {
          type: 'object',
          properties: {},
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
      case 'get_products': {
        const category = args?.category as string | undefined
        const limit = args?.limit as number | undefined
        const url = new URL(`${INTERNAL_API_URL}/api/products`)
        if (category) url.searchParams.set('category', category)
        if (limit) url.searchParams.set('limit', limit.toString())

        const response = await fetch(url.toString())
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }
        const products = await response.json()

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(products, null, 2),
            },
          ],
        }
      }

      case 'get_product_by_id': {
        const id = args?.id as number
        if (!id) {
          throw new Error('ID is required')
        }

        const response = await fetch(`${INTERNAL_API_URL}/api/products/${id}`)
        if (!response.ok) {
          throw new Error(`Product not found: ${response.statusText}`)
        }
        const product = await response.json()

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(product, null, 2),
            },
          ],
        }
      }

      case 'get_metrics': {
        const healthUrl = `${INTERNAL_API_URL}/api/health`
        const response = await fetch(healthUrl)
        const health = response.ok ? await response.json() : { status: 'unavailable' }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  api_url: INTERNAL_API_URL,
                  health,
                  timestamp: new Date().toISOString(),
                },
                null,
                2
              ),
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
  console.error('Internal API MCP Server running')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
