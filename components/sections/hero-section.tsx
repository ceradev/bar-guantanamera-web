"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Phone } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20"></div>
      </div>

      <motion.div
        className="container mx-auto px-4 md:px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <span className="text-sm font-semibold text-red-600 tracking-widest uppercase">23 años a su servicio</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
        >
          Bienvenidos a{" "}
          <span className="text-red-600 relative">
            Guantanamera
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            />
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Descubre los auténticos sabores de Cuba en cada bocado. Especialistas en comida criolla con ingredientes
          frescos y recetas tradicionales.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-full"
          >
            <a href="#menu" className="flex items-center gap-3">
              Ver el Menú
              <ChevronDown className="h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </Button>

          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-8 h-px bg-gray-300"></div>
            <span className="text-xl font-light">o</span>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-12 py-6 text-xl font-semibold transition-all duration-300 group bg-transparent rounded-full"
          >
            <a href="tel:+1234567890" className="flex items-center gap-3">
              <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Llamar Ahora
            </a>
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
            <img
              src="/placeholder.svg?height=500&width=800&text=Deliciosa+Comida+Cubana"
              alt="Platos tradicionales cubanos del restaurante Guantanamera"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}
