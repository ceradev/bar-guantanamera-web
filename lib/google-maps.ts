// Configuración segura para Google Maps
export const GOOGLE_MAPS_CONFIG = {
  // Place ID del Bar Guantanamera (desde variables de entorno)
  PLACE_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_ID || "ChIJdwu9GDaeagwRHa3sB6co6Bk",
  
  // URL base para reseñas
  REVIEW_BASE_URL: "https://search.google.com/local/writereview",
  
  // URL del lugar en Google Maps
  PLACE_URL: "https://maps.google.com/maps/place/bar+Guantanamera"
}

/**
 * Genera la URL para dejar una reseña en Google Maps
 * @returns URL segura para dejar reseñas
 */
export function getReviewUrl(): string {
  return `${GOOGLE_MAPS_CONFIG.REVIEW_BASE_URL}?placeid=${GOOGLE_MAPS_CONFIG.PLACE_ID}`
}

/**
 * Genera la URL del lugar en Google Maps
 * @returns URL del lugar
 */
export function getPlaceUrl(): string {
  return GOOGLE_MAPS_CONFIG.PLACE_URL
}

/**
 * Función alternativa que genera la URL completa del lugar
 * @returns URL completa del lugar en Google Maps
 */
export function getFullPlaceUrl(): string {
  return `https://maps.google.com/maps/place/${encodeURIComponent(GOOGLE_MAPS_CONFIG.PLACE_ID)}`
}
