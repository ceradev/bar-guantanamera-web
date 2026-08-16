# Modo de mantenimiento temporal de Guantanamera

## Objetivo

Mostrar una página de mantenimiento única en todas las rutas públicas de Bar Guantanamera mientras se prepara la nueva web, conservando intacta la aplicación actual y permitiendo restaurarla mediante un interruptor de configuración.

## Alcance

- Todas las páginas públicas se reescribirán temporalmente a `/mantenimiento` cuando `MAINTENANCE_MODE=true`.
- Los recursos de Next.js, imágenes, iconos, archivos públicos y rutas API quedarán fuera del middleware para que la página pueda cargarse y los servicios internos no reciban HTML inesperado.
- `/mantenimiento` quedará excluida de la reescritura para evitar bucles.
- Con `MAINTENANCE_MODE=false` o sin definir, la web actual funcionará sin cambios.
- La implementación no eliminará ni modificará las páginas actuales, el menú, los pedidos ni sus datos.

## Dirección visual aprobada

La pantalla será una campaña de una sola vista, no una plantilla genérica de “próximamente”.

- Fondo principal naranja `#FF6A00`.
- Texto, marca y llamada principal en blanco.
- Rojo `#C93420` reservado para pequeños acentos.
- Pollo asado monumental como foco visual.
- Recursos circulares inspirados en el giro del asador, con movimiento ambiental discreto.
- Tipografía display contundente para el titular y tipografía sans legible para información y acciones.
- Composición propia para escritorio y móvil; en móvil, la llamada estará siempre al alcance.

## Contenido

- Estado: `Seguimos abiertos`.
- Titular: `Estamos dando un nuevo giro`.
- Mensaje: `Estamos preparando una nueva experiencia digital. Mientras tanto, seguimos cocinando el sabor de siempre.`
- Acción principal: `Llamar y encargar` con `tel:+34922173039`.
- Teléfono visible: `922 17 30 39`.
- Trayectoria: `Más de dos décadas cocinando para San Isidro`.
- Dirección: `C. Castro, 7 · San Isidro`.
- Instagram: `@guantanamera.bar` enlazado al perfil oficial.

## Arquitectura

### Ruta de mantenimiento

`app/mantenimiento/page.tsx` será una página estática y un Server Component. Contendrá metadatos propios con `robots: noindex, nofollow`, porque la pantalla es temporal.

La interfaz se dividirá en componentes pequeños solo si la composición lo justifica. El contenido principal se mantendrá en una unidad clara y se reutilizarán `next/image`, `next/link` y los recursos locales.

### Activación global

`middleware.ts` comprobará `process.env.MAINTENANCE_MODE === "true"`. Cuando esté activo, reescribirá las rutas públicas a `/mantenimiento` manteniendo la URL solicitada en el navegador.

El matcher excluirá:

- `/mantenimiento`
- `/api/*`
- `/_next/static/*`
- `/_next/image/*`
- favicons, manifiesto, robots, sitemap y archivos con extensión

### Recursos

Se priorizarán los recursos reales ya presentes en `public/images`. Si el pollo disponible no funciona para el recorte monumental aprobado, se añadirá únicamente el recorte optimizado que ya forma parte de la referencia visual del proyecto. No se cargarán fotografías remotas.

## Flujo de datos

1. El visitante solicita cualquier página pública.
2. El middleware consulta `MAINTENANCE_MODE`.
3. Si está inactivo, Next.js continúa con la ruta original.
4. Si está activo, Next.js reescribe internamente la solicitud a `/mantenimiento`.
5. La página sirve recursos locales y el botón abre la llamada telefónica nativa.

No hay formularios, almacenamiento ni datos personales en esta pantalla.

## Accesibilidad y comportamiento

- Un único `h1` y jerarquía semántica clara.
- Contraste AA como mínimo.
- Foco visible para llamada, Instagram y ubicación.
- Etiquetas accesibles en iconos y enlaces.
- Respeto a `prefers-reduced-motion`.
- Área táctil mínima de 44 px.
- El CTA telefónico usará un enlace real y funcionará sin JavaScript.
- La composición será utilizable desde 320 px hasta pantallas de escritorio amplias.

## SEO y analítica

- La página temporal tendrá `noindex, nofollow`.
- No se borrarán los metadatos de la web actual.
- Vercel Analytics y Speed Insights podrán seguir funcionando desde el layout raíz.
- `robots.ts` y `sitemap.ts` no serán reescritos para evitar respuestas HTML inválidas.

## Errores y recuperación

- Si la variable no existe, el comportamiento seguro por defecto será mostrar la web actual.
- La ruta de mantenimiento será accesible directamente para previsualizarla antes de activar el interruptor.
- La restauración consistirá en establecer `MAINTENANCE_MODE=false` o eliminar la variable y volver a desplegar.

## Validación

- Compilación de producción con `next build`.
- Verificación de TypeScript.
- Comprobación directa de `/mantenimiento`.
- Comprobación de una muestra de rutas públicas con el modo activo y desactivado.
- Confirmación de que `/api/*` y recursos estáticos no son reescritos.
- Revisión visual en escritorio y móvil mediante navegador.
- Comprobación del enlace `tel:+34922173039`, Instagram y dirección.

## Fuera de alcance

- Cambiar o rediseñar la web completa existente.
- Implementar pedidos, reservas o backend nuevos.
- Modificar DNS o desplegar en producción.
- Publicar cambios en GitHub sin una autorización posterior explícita.
