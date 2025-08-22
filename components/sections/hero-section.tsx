"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Phone } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-50 to-orange-50"></div>

      <motion.div
        className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10 max-w-7xl h-full flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Content */}
          <div className="text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block text-sm font-medium text-red-600 tracking-[0.2em] uppercase bg-red-50 px-4 py-2 rounded-full border border-red-200">
                23 años a su servicio
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[0.9] tracking-tight"
            >
              Crujiente por fuera, <span className="text-red-600 block mt-2">jugoso por dentro</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 mb-16 leading-relaxed font-light"
            >
              Comida para llevar, para compartir y para disfrutar en familia. Especialidad en pollos, costillas y patas
              asadas con la receta casera que nos define.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-start">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 text-base font-semibold shadow-xl hover:shadow-red-600/25 transition-all duration-300 group rounded-full"
              >
                <a href="#menu" className="flex items-center gap-3">
                  Ver el Menú
                  <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-10 py-6 text-base font-semibold transition-all duration-300 group rounded-full bg-transparent"
              >
                <a href="tel:922173039" className="flex items-center gap-3">
                  <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Llamar Ahora
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="/placeholder.svg?width=600&height=600&text=Bar+Guantanamera"
              alt="Interior del Bar Guantanamera"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
