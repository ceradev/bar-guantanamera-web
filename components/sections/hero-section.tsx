"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Phone } from "lucide-react"
import Image from "next/image"
import { motion, easeOut } from "framer-motion"
import { Wave } from "@/components/ui/wave";

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

export default function HeroSection() {
  return (
    <motion.div
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-100 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-100 rounded-full opacity-25 blur-lg"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div className="text-center lg:text-left space-y-8" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-red-100"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-red-600 text-sm font-semibold tracking-wide">23 AÑOS A SU SERVICIO</span>
            </motion.div>

            {/* Main Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-tight">
                <span className="block">Sabores</span>
                <span className="block text-red-600">Auténticos</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-gray-700 mt-2">
                  que conquistan
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Crujiente por fuera, jugoso por dentro. Especialidad en pollos, costillas y patas asadas con la{" "}
              <span className="text-red-600 font-semibold">receta casera</span> que nos define.
            </motion.p>

            {/* Stats */}
            <motion.div className="flex flex-wrap justify-center lg:justify-start gap-8 py-6" variants={itemVariants}>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">23</div>
                <div className="text-sm text-gray-600 font-medium">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">30k+</div>
                <div className="text-sm text-gray-600 font-medium">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">4.3</div>
                <div className="text-sm text-gray-600 font-medium">Valoración media</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-red-600 text-white shadow-2xl shadow-red-500/30 hover:bg-red-700 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold group"
              >
                <a href="#menu">
                  Ver el Menú
                  <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-200" />
                </a>
              </Button>

              {/* Separator for mobile */}
              <div className="sm:hidden flex items-center justify-center w-full">
                <div className="text-gray-400 font-medium text-sm">o</div>
              </div>

              {/* Separator for desktop */}
              <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

              <Button
                size="lg"
                asChild
                variant="outline"
                className="w-full sm:w-auto border-2 border-red-600 text-red-600 hover:bg-red-50 hover:border-red-700 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 text-lg font-semibold group transition-all duration-300"
              >
                <a href="tel:922173039">
                  <Phone className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  Llamar Ahora
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span>Ingredientes frescos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span>Entrega rápida</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <span>Receta casera</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div className="relative h-96 lg:h-[600px] w-full" variants={itemVariants}>
            {/* Main Image Container */}
            <div className="relative h-full w-full">
              {/* Background Card */}
              <div className="absolute inset-4 bg-white rounded-3xl shadow-2xl"></div>

              {/* Main Image */}
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl group">
                <Image
                  src="images/hero-image.jpg"
                  alt="Plato de pollo asado y costillas - Especialidad Guantanamera"
                  fill
                  className="transition-transform duration-700 group-hover:scale-105 object-cover"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <div key={i + 1} className="w-4 h-4 text-yellow-400 fill-current">
                          ⭐
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-800">4.3</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">+100 reseñas</p>
                </div>

                <div className="absolute bottom-6 left-6 bg-red-600 text-white rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-sm font-bold">🔥 Más pedido</p>
                  <p className="text-xs opacity-90">Pollo entero + patatas</p>
                </div>
              </div>

              {/* Decorative Elements around Image */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-red-200 rounded-full opacity-60 blur-sm"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-200 rounded-full opacity-50 blur-sm"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <Wave position="bottom" />
    </motion.div>
  )
}
