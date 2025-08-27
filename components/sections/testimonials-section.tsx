"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Filter, ChevronDown, User, Calendar, ThumbsUp } from "lucide-react"
import { motion, easeOut, useInView } from "framer-motion"
import { useRef, useState } from "react"

const testimonials = [
  {
    quote:
      "¡El mejor pollo asado que he probado en años! Jugoso, sabroso y con ese toque casero inconfundible. Las costillas también son espectaculares. ¡Repetiremos sin duda!",
    name: "Carlos García",
    location: "Madrid Centro",
    rating: 5,
    date: "Hace 2 días",
    verified: true,
    helpful: 24,
    category: "Comida",
    avatar: "/placeholder.svg?width=60&height=60",
  },
  {
    quote:
      "Un sitio familiar y acogedor. La comida es deliciosa y el trato es excelente. Perfecto para una comida de fin de semana. Las patatas asadas son un vicio.",
    name: "Laura Martínez",
    location: "Chamberí",
    rating: 5,
    date: "Hace 1 semana",
    verified: true,
    helpful: 18,
    category: "Servicio",
    avatar: "/placeholder.svg?width=60&height=60",
  },
  {
    quote:
      "Pedimos a domicilio y llegó todo caliente y en perfecto estado. Las raciones son generosas y la calidad es de primera. Muy recomendable para pedidos online.",
    name: "Javier Fernández",
    location: "Malasaña",
    rating: 4,
    date: "Hace 3 días",
    verified: true,
    helpful: 12,
    category: "Delivery",
    avatar: "/placeholder.svg?width=60&height=60",
  },
  {
    quote:
      "Ambiente perfecto para celebraciones familiares. El personal es muy atento y la comida llega rápido. Los precios son muy justos para la calidad que ofrecen.",
    name: "María José López",
    location: "Retiro",
    rating: 5,
    date: "Hace 5 días",
    verified: true,
    helpful: 31,
    category: "Ambiente",
    avatar: "/placeholder.svg?width=60&height=60",
  },
  {
    quote:
      "Las costillas BBQ están increíbles, tiernas y con mucho sabor. El local está muy limpio y el servicio es rápido. Ideal para ir con amigos.",
    name: "David Ruiz",
    location: "Chueca",
    rating: 4,
    date: "Hace 1 semana",
    verified: false,
    helpful: 8,
    category: "Comida",
    avatar: "/placeholder.svg?width=60&height=60",
  },
  {
    quote:
      "Excelente relación calidad-precio. Los menús combinados están muy bien y son abundantes. El pollo está siempre en su punto perfecto.",
    name: "Ana Rodríguez",
    location: "Salamanca",
    rating: 5,
    date: "Hace 4 días",
    verified: true,
    helpful: 15,
    category: "Precio",
    avatar: "/placeholder.svg?width=60&height=60",
  },
]

const categories = ["Todas", "Comida", "Servicio", "Delivery", "Ambiente", "Precio"]
const ratings = [
  { value: "all", label: "Todas las valoraciones" },
  { value: 5, label: "5 estrellas" },
  { value: 4, label: "4 estrellas" },
  { value: 3, label: "3 estrellas" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

const StarRating = ({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i + rating}
        className={`${size} ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        } transition-colors duration-200`}
      />
    ))}
  </div>
)

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedRating, setSelectedRating] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const categoryMatch = selectedCategory === "Todas" || testimonial.category === selectedCategory
    const ratingMatch = selectedRating === "all" || testimonial.rating === Number(selectedRating)
    return categoryMatch && ratingMatch
  })

  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
  const totalReviews = testimonials.length

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, filteredTestimonials.length))
  }

  return (
    <section id="opiniones" className="w-full scroll-mt-16 bg-white py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Enhanced Header with Stats */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-yellow-600 text-sm font-medium tracking-wide">OPINIONES VERIFICADAS</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
            Qué Dicen Nuestros <span className="text-red-600">Clientes</span>
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed mb-8">
            La satisfacción de nuestros clientes es nuestro mayor orgullo. Lee las experiencias reales de quienes ya han
            disfrutado de nuestra cocina tradicional.
          </p>

          {/* Rating Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-gray-50 rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">{averageRating}</div>
              <StarRating rating={Math.round(Number.parseFloat(averageRating))} size="w-5 h-5" />
              <p className="text-sm text-gray-600 mt-1">Valoración media</p>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">{totalReviews}</div>
              <p className="text-sm text-gray-600">Reseñas totales</p>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-sm text-gray-600">Recomiendan</p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrar por valoración
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>

              {showFilters && (
                <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-2 min-w-[200px] z-10">
                  {ratings.map((rating) => (
                    <button
                      key={rating.value}
                      onClick={() => {
                        setSelectedRating(rating.value.toString())
                        setShowFilters(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
                        selectedRating === rating.value ? "bg-red-50 text-red-600" : "text-gray-700"
                      }`}
                    >
                      {rating.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
            <motion.div key={`${testimonial.name}-${index}`} variants={cardVariants}>
              <Card className="group h-full overflow-hidden rounded-2xl border-0 bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="p-6">
                  {/* Header with Avatar and Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                        <User className="w-full h-full p-2 text-gray-400" />
                      </div>
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {testimonial.name}
                        </h4>
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-600 bg-gray-50">
                          {testimonial.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={testimonial.rating} />
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{testimonial.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-red-100 fill-current" />
                    <blockquote className="text-gray-700 leading-relaxed pl-6 italic">"{testimonial.quote}"</blockquote>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Verificada</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{testimonial.helpful}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredTestimonials.length && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              onClick={loadMore}
              variant="outline"
              className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 bg-transparent"
            >
              Ver más reseñas ({filteredTestimonials.length - visibleCount} restantes)
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-red-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">¿Ya has probado nuestra comida?</h3>
            <p className="text-gray-600 mb-6">
              Comparte tu experiencia y ayuda a otros clientes a descubrir los sabores de Guantanamera.
            </p>
            <Button
              asChild
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="#pedir">Deja tu reseña</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
