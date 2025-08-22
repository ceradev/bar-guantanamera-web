"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Phone } from "lucide-react"
import Image from "next/image"
import { motion, easeOut } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="w-full bg-white">
      <motion.div
        className="container mx-auto grid items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:py-24 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 text-center md:text-left" variants={itemVariants}>
          <div className="space-y-2">
            <motion.p className="text-sm font-medium text-red-600 tracking-wide uppercase" variants={itemVariants}>
              23 años a su servicio
            </motion.p>
            <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl md:text-6xl">
              Crujiente por fuera, jugoso por dentro
            </h1>
          </div>
          <p className="mx-auto max-w-xl text-lg text-gray-700 md:mx-0">
            Comida para llevar, para compartir y para disfrutar en familia. Especialidad en pollos, costillas y patas
            asadas con la receta casera que nos define.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Button
              size="default"
              asChild
              className="w-full bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-700 sm:w-auto sm:size-lg"
            >
              <a href="#menu">
                Ver el Menú <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            <div className="text-gray-400 font-medium">o</div>
            <Button
              size="default"
              asChild
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50 sm:w-auto bg-transparent sm:size-lg"
            >
              <a href="tel:922173039">
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Llamar Ahora
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="relative h-64 w-full overflow-hidden rounded-2xl shadow-2xl md:h-auto md:aspect-[4/3]"
          variants={itemVariants}
        >
          <Image
            src="/placeholder.svg?width=800&height=600"
            alt="Plato de pollo asado y costillas"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
