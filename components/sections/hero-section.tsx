"use client"

import type React from "react"
import { motion } from "framer-motion"
import { itemVariants } from "@/utils/animations"

const HeroSection: React.FC = () => {
  return (
    <section className="bg-cover bg-center h-screen relative">
      <div className="container mx-auto flex flex-col justify-center items-center h-full text-center">
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-8" variants={itemVariants}>
          Auténtica Cocina Cubana en el Corazón de la Ciudad
        </motion.h1>
        <motion.p className="text-lg md:text-xl text-red-600 font-semibold mb-4" variants={itemVariants}>
          23 años a su servicio
        </motion.p>
        <motion.p className="text-lg md:text-xl text-white mb-8" variants={itemVariants}>
          Descubre los sabores auténticos de Cuba en nuestro restaurante.
        </motion.p>
        {/* rest of code here */}
      </div>
    </section>
  )
}

export default HeroSection
