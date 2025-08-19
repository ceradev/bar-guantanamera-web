"use client"

import Image from "next/image"
import { motion, easeOut, useInView } from "framer-motion"
import { useRef } from "react"

const images = [
  { src: "/placeholder.svg?width=600&height=400", alt: "Pollo asado jugoso", className: "md:col-span-2" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Interior del restaurante" },
  { src: "/placeholder.svg?width=400&height=400", alt: "Clientes disfrutando" },
  { src: "/placeholder.svg?width=600&height=400", alt: "Costillas asadas", className: "md:col-span-2" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

export default function PhotoGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="galeria" className="w-full scroll-mt-16 bg-white py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Un Vistazo a Guantanamera</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Nuestros sabores, nuestro local y los buenos momentos que compartimos.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`group relative h-48 w-full overflow-hidden rounded-xl shadow-md md:h-64 ${image.className}`}
              variants={imageVariants}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-bold text-white md:text-lg">{image.alt}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
