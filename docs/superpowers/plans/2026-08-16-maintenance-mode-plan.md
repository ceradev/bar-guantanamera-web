# Plan de implementación: modo de mantenimiento

## Resultado esperado

La aplicación conservará todas sus páginas y servicios actuales, pero podrá mostrar una campaña de mantenimiento en cualquier URL pública mediante `MAINTENANCE_MODE=true`.

## Tareas

### 1. Recursos y tipografía

- Añadir a `public/images/maintenance/` el logo blanco y el recorte optimizado del pollo aprobados.
- Añadir Bowlby One a `lib/fonts.ts` y exponer su variable desde `app/layout.tsx`.
- Mantener Montserrat y Open Sans para no alterar las páginas existentes.

### 2. Página de mantenimiento

- Crear `app/mantenimiento/page.tsx` como Server Component estático.
- Crear `app/mantenimiento/maintenance.module.css` para aislar completamente el diseño.
- Incluir metadatos temporales `noindex, nofollow`.
- Implementar CTA telefónico sin JavaScript, enlaces a ubicación e Instagram y movimiento reducido accesible.

### 3. Activación global reversible

- Crear `middleware.ts` para reescribir las páginas públicas cuando `MAINTENANCE_MODE=true`.
- Excluir la propia ruta, API, recursos internos de Next.js, metadatos técnicos y archivos públicos.
- Ocultar los botones flotantes de la web anterior desde `app/layout.tsx` cuando el modo esté activo.
- Documentar `MAINTENANCE_MODE` en `.env.example`.

### 4. Verificación

- Instalar dependencias con el gestor detectado por el repositorio.
- Ejecutar `next build` con el modo activo y desactivado.
- Levantar el servidor con el modo activo.
- Verificar `/`, `/menu` y `/mantenimiento` en escritorio y móvil.
- Verificar que recursos y rutas API no sean reescritos.
- Revisar foco, contraste, movimiento reducido, enlaces y ausencia de solapes.
- Ejecutar `git diff --check` y revisar el diff final.

## Archivos previstos

- `app/mantenimiento/page.tsx`
- `app/mantenimiento/maintenance.module.css`
- `app/layout.tsx`
- `lib/fonts.ts`
- `middleware.ts`
- `.env.example`
- `public/images/maintenance/guantanamera-logo-white.png`
- `public/images/maintenance/guantanamera-hero-chicken.webp`
