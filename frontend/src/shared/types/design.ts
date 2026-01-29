/**
 * Tipos para análisis visual y generación de UI desde mockups (Módulo 9).
 * Usados por Cursor AI para estructurar análisis de diseños y reportes de debugging.
 */

export interface Position {
  x: number
  y: number
  width: number
  height: number
}

export interface StyleProperties {
  backgroundColor?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  borderRadius?: string
  padding?: string
  margin?: string
}

export interface ComponentMeta {
  type: 'button' | 'input' | 'card' | 'navigation' | 'form' | 'image' | 'text'
  properties: Record<string, unknown>
  position: Position
  styling: StyleProperties
}

export interface LayoutStructure {
  type: 'flex' | 'grid' | 'stack'
  direction?: 'row' | 'column'
  gap?: string
  alignItems?: string
  justifyContent?: string
}

export interface AssetMap {
  images: string[]
  icons: string[]
  fonts?: string[]
}

export interface InteractionFlow {
  from: string
  to: string
  trigger: string
  action?: string
}

export interface MockupAnalysis {
  components: ComponentMeta[]
  layout: LayoutStructure
  assets: AssetMap
  interactions: InteractionFlow[]
}

/** Severidad de un issue detectado en debugging visual */
export type DebugIssueSeverity = 'low' | 'medium' | 'high'

/** Tipo de issue en reporte de debugging */
export interface DebugIssue {
  type: 'layout' | 'color' | 'responsive' | 'typography' | 'accessibility'
  description: string
  severity: DebugIssueSeverity
  fix: string
}

/** Reporte generado por Cursor AI al comparar captura vs mockup */
export interface DebuggingReport {
  timestamp: string
  issues: DebugIssue[]
  suggestions: string[]
}

/** Resumen de componente generado desde mockup */
export interface GeneratedComponentSummary {
  name: string
  source: string
  features: string[]
  file: string
}

/** Resumen de página generada */
export interface GeneratedPageSummary {
  name: string
  components: string[]
  file: string
}

/** Resumen del proyecto UI generado desde diseños */
export interface ProjectUISummary {
  components: GeneratedComponentSummary[]
  pages: GeneratedPageSummary[]
}

/** Categorías de optimizaciones (Módulo 9) */
export interface UIOptimizations {
  performance: string[]
  accessibility: string[]
  responsive: string[]
  seo: string[]
}

/** Métricas de rendimiento sugeridas por Cursor AI */
export interface PerformanceMetrics {
  lighthouse: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  coreWebVitals: {
    lcp: string
    fid: string
    cls: string
  }
  bundleAnalysis: {
    mainBundle: string
    vendorBundle: string
    totalSize: string
  }
  loadingTimes: {
    firstPaint: string
    firstContentfulPaint: string
    timeToInteractive: string
  }
}
