"use client"

import { Heart, Leaf, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: <Heart className="h-8 w-8 text-red-600" />,
    title: "Receta Familiar",
    description:
      "Nuestro sabor único proviene de una receta que ha pasado de generación en generación, llena de tradición y amor.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-red-600" />,
    title: "Ingredientes Frescos",
    description:
      "Seleccionamos a diario los mejores ingredientes locales para garantizar la máxima calidad y frescura en cada plato.",
  },
  {
    icon: <Users className="h-8 w-8 text-red-600" />,
    title: "Ambiente Acogedor",
    description:
      "Queremos que te sientas como en casa. Nuestro restaurante es un espacio familiar donde crear buenos recuerdos.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "backOut",
    },
  },
}

export default function WhyChooseUsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="w-full bg-white py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid gap-12 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
                variants={iconVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-bold text-black"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="mt-2 text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
