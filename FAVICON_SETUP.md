# 🎨 Favicon del Bar Guantanamera

## 🖼️ Archivos del Favicon

### **Favicon Principal:**
- **`favicon.ico`** - Favicon principal en formato ICO (16KB)
- **`favicon-16x16.png`** - Versión PNG de 16x16 píxeles
- **`favicon-32x32.png`** - Versión PNG de 32x32 píxeles

### **Iconos para Dispositivos Móviles:**
- **`apple-touch-icon.png`** - Icono para iOS (180x180 píxeles)
- **`android-chrome-192x192.png`** - Icono para Android (192x192 píxeles)
- **`android-chrome-512x512.png`** - Icono para Android de alta resolución (512x512 píxeles)

### **Configuración Web:**
- **`site.webmanifest`** - Manifesto para PWA y dispositivos móviles

## 🚀 Configuración Implementada

### **Layout (`app/layout.tsx`):**
```typescript
icons: {
  icon: [
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon.ico", type: "image/x-icon" }
  ],
  shortcut: "/favicon.ico",
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
  ],
  other: [
    { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
    { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" }
  ]
},
manifest: "/site.webmanifest"
```

### **Webmanifest (`site.webmanifest`):**
```json
{
  "name": "Bar Cafeteria Guantanamera",
  "short_name": "Guantanamera",
  "description": "Especialidad en pollos, costillas y patas asadas con la receta casera que nos define",
  "theme_color": "#FF4444",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

## 🎯 Características del Favicon

### **Diseño:**
- **Pollo asado** con llamas en la base
- **Paleta de colores**: Rojo (#FF4444), negro y blanco
- **Estilo**: Cartoon/logo estilizado y profesional
- **Fondo**: Circular blanco con contorno negro

### **Elementos Visuales:**
- Pollo asado en rojo con detalles negros (condimentos)
- Llamas estilizadas en la base
- Asador/rotisserie negro con destello blanco
- Diseño limpio y memorable

## 📱 Compatibilidad

### **Navegadores:**
- **Chrome/Edge**: PNG y ICO
- **Firefox**: PNG y ICO
- **Safari**: PNG y ICO
- **Internet Explorer**: ICO

### **Dispositivos Móviles:**
- **iOS**: Apple Touch Icon (180x180)
- **Android**: Chrome Icons (192x192, 512x512)
- **PWA**: Webmanifest con iconos

## ✨ Beneficios

1. **Identidad Visual**: Logo único del pollo asado
2. **Compatibilidad Total**: Funciona en todos los dispositivos
3. **Profesionalismo**: Diseño limpio y atractivo
4. **Reconocimiento**: Asocia inmediatamente el bar con su especialidad
5. **PWA Ready**: Preparado para instalación como aplicación

## 🔄 Mantenimiento

### **Para Cambiar el Favicon:**
1. Genera nuevos archivos en [favicon.io](https://favicon.io/favicon-converter/)
2. Reemplaza todos los archivos en `/public/`
3. Actualiza el `site.webmanifest` si es necesario
4. El layout se actualiza automáticamente

### **Generación de Nuevos Iconos:**
1. Sube tu imagen original (mínimo 512x512 píxeles)
2. Descarga el paquete completo
3. Reemplaza los archivos existentes
4. Verifica que funcionen en todos los navegadores

El favicon del Bar Guantanamera ahora está completamente configurado y funcionando en todos los dispositivos y navegadores, representando perfectamente la especialidad del establecimiento con un diseño profesional y memorable.
