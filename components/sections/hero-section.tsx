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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/placeholder-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40"></div>
      </div>

      <motion.div
        className="container mx-auto px-6 md:px-8 text-center relative z-10 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block text-sm font-medium text-red-400 tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            23 años a su servicio
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[0.9] tracking-tight"
        >
          Crujiente por fuera, <span className="text-red-400 block mt-2">jugoso por dentro</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Comida para llevar, para compartir y para disfrutar en familia. Especialidad en pollos, costillas y patas
          asadas con la receta casera que nos define.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 text-base font-semibold shadow-2xl hover:shadow-red-600/25 transition-all duration-300 group rounded-full border-2 border-transparent hover:border-red-400"
          >
            <a href="#menu" className="flex items-center gap-3">
              Ver el Menú
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </Button>

          <div className="flex items-center gap-4 text-white/60">
            <div className="w-12 h-px bg-white/30"></div>
            <span className="text-lg font-light">o</span>
            <div className="w-12 h-px bg-white/30"></div>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-6 text-base font-semibold transition-all duration-300 group bg-white/10 backdrop-blur-sm rounded-full hover:border-white"
          >
            <a href="tel:922173039" className="flex items-center gap-3">
              <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Llamar Ahora
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
