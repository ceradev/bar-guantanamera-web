import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "¡El mejor pollo asado que he probado en años! Jugoso, sabroso y con ese toque casero inconfundible. ¡Repetiremos sin duda!",
    name: "Carlos G.",
    rating: 5,
  },
  {
    quote:
      "Un sitio familiar y acogedor. La comida es deliciosa y el trato es excelente. Perfecto para una comida de fin de semana.",
    name: "Laura Martínez",
    rating: 5,
  },
  {
    quote:
      "Pedimos a domicilio y llegó todo caliente y en perfecto estado. Las raciones son generosas y la calidad es de primera.",
    name: "Javier Fernández",
    rating: 4,
  },
]

export default function TestimonialsSection() {
  return (
    <section id="opiniones" className="w-full scroll-mt-16 bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Qué Dicen Nuestros Clientes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">Vuestra satisfacción es nuestro mayor orgullo.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col rounded-xl border-gray-200 bg-gray-50 p-6 shadow-sm">
              <div className="flex items-center gap-1 text-red-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={i < testimonial.rating ? "fill-current" : ""} size={20} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg text-gray-800">"{testimonial.quote}"</blockquote>
              <p className="mt-4 font-bold text-black">— {testimonial.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
