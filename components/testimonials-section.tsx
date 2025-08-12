"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const starVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "backOut",
    },
  }),
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="opiniones" className="w-full scroll-mt-16 bg-white py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Qué Dicen Nuestros Clientes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">Vuestra satisfacción es nuestro mayor orgullo.</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} variants={cardVariants}>
              <Card className="flex flex-col rounded-xl border-gray-200 bg-gray-50 p-6 shadow-sm">
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 },
                  }}
                  className="h-full"
                >
                  <div className="flex items-center gap-1 text-red-500">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        variants={starVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={i}
                      >
                        <Star className={i < testimonial.rating ? "fill-current" : ""} size={20} />
                      </motion.div>
                    ))}
                  </div>
                  <motion.blockquote
                    className="mt-4 flex-1 text-lg text-gray-800"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    "{testimonial.quote}"
                  </motion.blockquote>
                  <motion.p
                    className="mt-4 font-bold text-black"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    — {testimonial.name}
                  </motion.p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
