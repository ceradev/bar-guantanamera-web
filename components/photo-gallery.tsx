"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
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
      delayChildren: 0.2,
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
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

export default function PhotoGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="galeria" className="w-full scroll-mt-16 bg-gray-50 py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Un Vistazo a Guantanamera</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Nuestros sabores, nuestro local y los buenos momentos que compartimos.
          </p>
        </motion.div>
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
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                className="relative h-full w-full"
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} layout="fill" objectFit="cover" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
              <motion.p
                className="absolute bottom-4 left-4 text-sm font-bold text-white md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                {image.alt}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
