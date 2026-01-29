# Accesibilidad (a11y)

## General
- Usar componentes de Ant Design; ya incluyen atributos ARIA y roles cuando aplica
- Completar `aria-label` en iconos sin texto (ej. botones solo con icono)
- Contraste: respetar tema por defecto de antd; revisar en modo oscuro si se usa

## Formularios
- Asociar `<label>` a cada input o usar `Form.Item` de antd con `label`
- Mensajes de error con `Form.Item` `validateStatus` y `help`; antd los vincula al campo

## Navegación
- Menú navegable por teclado (antd Menu lo soporta)
- Focus visible: no desactivar outline sin reemplazo visible

## Rutas y contenido dinámico
- Cambios de ruta: asegurar que el foco o el anuncio para lectores de pantalla sea adecuado
- Loading/error states: usar `message`/`Alert` de antd con roles apropiados
