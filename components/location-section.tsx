import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export default function LocationSection() {
  return (
    <section id="ubicacion" className="w-full scroll-mt-16 bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Ven a Visitarnos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Estamos deseando recibirte. Encuéntranos en el corazón de la ciudad.
          </p>
        </div>
        <Card className="overflow-hidden rounded-2xl border-gray-200 shadow-xl">
          <CardContent className="p-0">
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
        <div className="mt-8 text-center">
          <p className="text-xl font-semibold text-gray-900">
            <MapPin className="mr-2 inline-block h-5 w-5 text-red-600" />
            Calle Falsa, 123, 28080 Madrid, España
          </p>
        </div>
      </div>
    </section>
  )
}
