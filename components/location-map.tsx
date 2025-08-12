import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function LocationMap() {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <MapPin className="h-6 w-6 text-red-600" />
          Nuestra Ubicación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* 
          IMPORTANTE: Reemplaza el 'src' de este iframe con el código de inserción de Google Maps para tu dirección.
          1. Ve a Google Maps.
          2. Busca la dirección de tu restaurante.
          3. Haz clic en "Compartir" y luego en "Insertar un mapa".
          4. Copia el código HTML y pega el valor del atributo 'src' aquí.
        */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.649499513813!2d-3.705789184604108!3d40.41677537936505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422880a0b0b0b1%3A0x4a4b0b0b0b0b0b0b!2sPlaza%20Mayor!5e0!3m2!1ses!2ses!4v1678886543210!5m2!1ses!2ses"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación del Restaurante Guantanamera"
        />
      </CardContent>
    </Card>
  )
}
