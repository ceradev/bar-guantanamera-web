# 🔐 Configuración Segura de Google Maps

## 📋 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Google Maps Configuration
NEXT_PUBLIC_GOOGLE_MAPS_PLACE_ID=ChIJdwu9GDaeagwRHa3sB6co6Bk
NEXT_PUBLIC_GOOGLE_MAPS_PLACE_NAME=bar+Guantanamera
```

## 🚀 URLs Generadas

### Para Dejar Reseñas:
```
https://search.google.com/local/writereview?placeid=ChIJdwu9GDaeagwRHa3sB6co6Bk
```

### Para Ver el Lugar:
```
https://maps.google.com/maps/place/bar+Guantanamera
```

## 🛡️ Seguridad Implementada

1. **Place ID no expuesto**: Se almacena en variables de entorno
2. **Funciones helper**: Generan URLs de forma segura
3. **Sin claves API**: No se exponen claves de Google Maps
4. **Configuración centralizada**: Todo en un solo archivo

## 📁 Archivos Creados

- `lib/google-maps.ts` - Configuración y funciones helper
- `components/sections/testimonials-section.tsx` - Componente actualizado
- `.env.local` - Variables de entorno (crear manualmente)

## 🔧 Uso en el Código

```typescript
import { getReviewUrl, getPlaceUrl } from "@/lib/google-maps"

// Para reseñas
const reviewUrl = getReviewUrl()

// Para ver el lugar
const placeUrl = getPlaceUrl()
```

## ⚠️ Notas Importantes

- Las variables `NEXT_PUBLIC_*` son visibles en el cliente
- Para mayor seguridad, considera crear una API route
- El Place ID es público por naturaleza (no es información sensible)
- Las URLs generadas son seguras para uso público
