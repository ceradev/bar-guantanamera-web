"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { motion, easeOut, useInView } from "framer-motion"
import { useRef } from "react"

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const mapVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      delay: 0.2,
    },
  },
}

const addressVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: 0.4,
    },
  },
}

export default function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="ubicacion" className="w-full scroll-mt-16 bg-white py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Ven a Visitarnos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Estamos deseando recibirte. Encuéntranos en el corazón de la ciudad.
          </p>
        </motion.div>
        <motion.div
          variants={mapVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
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
        </motion.div>
        <motion.div
          className="mt-8 text-center"
          variants={addressVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            className="text-xl font-semibold text-gray-900"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            <motion.span
              className="mr-2 inline-block"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              <MapPin className="h-5 w-5 text-red-600" />
            </motion.span>
            Calle Falsa, 123, 28080 Madrid, España
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
