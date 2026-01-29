# Agentes y Background Tasks (Módulo 8)

## Resumen del Módulo 8

**Tema:** Agentes y Background Tasks: Background Agents para tareas largas, BugBot para revisión automática de PRs, integración con Slack/Teams, commit messages semánticos y testing automatizado con validación continua.

**Objetivos:** Automatizar tareas de larga duración con Background Agents, configurar BugBot para code review automático, integrar Cursor con Slack/Teams, optimizar AI commit messages con análisis semántico y establecer pipelines de testing y validación continua.

---

## Estructura implementada (Módulo 8)

### Configuración

- **.cursor/config/background-agents.json**  
  Habilitación, max_concurrent_agents, execution_environment (node/python, memory, timeout), notification_settings (slack_webhook, email), security, cost_controls. Por defecto `enabled: false`.

- **.cursor/config/bugbot.json**  
  Habilitación, trigger_on (pull_request_opened, pull_request_synchronize), review_depth, analysis_capabilities (syntax, semantic, security, performance, architecture, test_coverage), review_categories (bugs, security, performance), integración GitHub (comentarios, request_changes, labels) y Slack. Por defecto `enabled: false`.

- **.cursor/config/slack-integration.json**  
  Canales (development, code-review, deployments, alerts, cursor-ai), notificaciones (background_agents, bugbot_reviews), interactive_features (slash_commands, etc.). Por defecto `enabled: false`; rellenar bot_token y signing_secret si se usa.

- **.cursor/config/semantic-commits.json**  
  AI commit messages: semantic_enhancement (impact_analysis, change_summaries), commit_categorization (feat, fix, perf, etc.), advanced_features (breaking_change_detection, etc.). Complementa a commit-messages.json del Módulo 3.

- **.cursor/config/automated-testing.json**  
  Triggers (pre_commit, pull_request, scheduled), test_generation (coverage_target, test_types), validation_pipeline (static_analysis, security, etc.), ai_capabilities. Por defecto validación estática activa; test_generation y ai_capabilities en false.

### Agentes

- **.cursor/agents/refactoring-agent.yml**  
  Ejemplo de agente: nombre, descripción, triggers (manual, scheduled domingo 2 AM, git_event files_changed >50), capabilities, parameters (scope, safety_level), execution_steps (analyze, plan, execute), rollback_strategy.

---

## Cómo usar

- **Background Agents:** Activar en `background-agents.json` (`enabled: true`) si tu plan de Cursor lo soporta; configurar notificaciones y cost_controls según necesidad.
- **BugBot:** Activar en `bugbot.json` si está disponible; ajustar severity_threshold y block_merge_on según política del equipo.
- **Slack:** Rellenar `bot_token` y `signing_secret` en `slack-integration.json` y activar cuando se use integración Slack.
- **Commits semánticos:** Ya se usa `commit-messages.json` (Módulo 3); `semantic-commits.json` añade análisis semántico y categorización; revisar mensajes antes de commit.
- **Testing automatizado:** Los workflows en `.github/workflows/` (backend, frontend) ejecutan tests en PR; `automated-testing.json` documenta opciones de generación y validación cuando Cursor las soporte.

---

## Prompts sugeridos para Cursor (Módulo 8)

1. "Revisa este PR como BugBot: analiza bugs potenciales, seguridad (SQL injection, XSS), y violaciones de nuestras reglas en .cursor/rules/."
2. "Genera un mensaje de commit semántico (Conventional Commits) para los cambios actuales; incluye tipo, scope, resumen y body con lista de cambios."
3. "Propón un plan de refactoring para migrar [módulo] a los patrones de .cursor/rules/global/ y .cursor/rules/domain/; prioriza por impacto y riesgo."
4. "Añade tests unitarios para [archivo] siguiendo .cursor/rules/testing.mdc y los ejemplos en tests/."

---

## Troubleshooting

- **Background agents no responden:** Comprobar que la función esté habilitada en tu plan; revisar API keys y límites en la documentación de Cursor.
- **BugBot genera muchos falsos positivos:** Subir severity_threshold en bugbot.json; reducir review_depth si aplica.
- **Slack no recibe notificaciones:** Verificar webhook/bot token y signing secret; comprobar que el canal exista y el bot tenga permisos.
- **Commits semánticos inconsistentes:** Revisar semantic-commits.json y commit-messages.json; dar feedback en el editor para afinar el modelo.
