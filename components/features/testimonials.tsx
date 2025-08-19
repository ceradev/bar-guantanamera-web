import { Card, CardContent } from "@/components/ui/card"
import { Star, UserCircle } from "lucide-react"

const testimonials = [
  {
    quote:
      "¡El mejor pollo asado que he probado en años! Jugoso, sabroso y con ese toque casero inconfundible. Las costillas también son espectaculares. ¡Repetiremos sin duda!",
    name: "Carlos G.",
    rating: 5,
  },
  {
    quote:
      "Un sitio familiar y acogedor. La comida es deliciosa y el trato es excelente. Perfecto para una comida de fin de semana. Las patatas asadas son un vicio.",
    name: "Laura Martínez",
    rating: 5,
  },
  {
    quote:
      "Pedimos a domicilio y llegó todo caliente y en perfecto estado. Las raciones son generosas y la calidad es de primera. Muy recomendable.",
    name: "Javier Fernández",
    rating: 4,
  },
]

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-red-600">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={i < rating ? "fill-current" : ""} size={16} />
    ))}
  </div>
)

export default function Testimonials() {
  return (
    <section id="testimonios" className="w-full scroll-mt-16 bg-white py-8 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl font-bold tracking-tighter text-gray-900 sm:text-3xl md:text-4xl">
            Qué Dicen Nuestros Clientes
          </h2>
          <p className="mx-auto mt-3 max-w-[700px] text-sm text-gray-600 sm:text-base md:text-xl">
            Vuestra satisfacción es nuestro mayor orgullo. Estas son algunas de vuestras valoraciones.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between bg-gray-50 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-3 border-l-4 border-red-600 pl-3 text-sm italic text-gray-700 sm:mt-4 sm:pl-4 sm:text-base lg:text-lg">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
              <div className="flex items-center gap-3 border-t bg-white p-3 sm:p-4">
                <UserCircle className="h-6 w-6 text-gray-500 sm:h-8 sm:w-8" />
                <p className="text-sm font-semibold text-gray-900 sm:text-base">{testimonial.name}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
