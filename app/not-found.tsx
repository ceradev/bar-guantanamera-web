"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Utensils, MapPin, Phone, ArrowLeft, ChefHat, Flame } from "lucide-react"
import Link from "next/link"
import { motion, easeInOut, easeOut } from "framer-motion"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  }

  const floatingVariants = {
    initial: { y: 0 },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  }

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating food icons */}
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-10"
          variants={floatingVariants}
          initial="initial"
          animate="float"
        >
          🍗
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-5xl opacity-10"
          variants={floatingVariants}
          initial="initial"
          animate="float"
          style={{ animationDelay: "1s" }}
        >
          🥩
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-4xl opacity-10"
          variants={floatingVariants}
          initial="initial"
          animate="float"
          style={{ animationDelay: "2s" }}
        >
          🌯
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-5xl opacity-10"
          variants={floatingVariants}
          initial="initial"
          animate="float"
          style={{ animationDelay: "0.5s" }}
        >
          🍺
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 404 Number */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-9xl md:text-[12rem] font-bold text-red-600 leading-none"
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Main message */}
        <motion.div
          className="mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChefHat className="w-6 h-6 text-red-600" />
            <span className="text-red-600 font-semibold text-lg">¡Ups! Página no encontrada</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Parece que te has perdido en el camino
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            No te preocupes, en Bar Guantanamera siempre hay un camino de regreso. 
            Mientras tanto, ¿por qué no exploras nuestro delicioso menú?
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Volver al Inicio
              </Button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/#menu">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Utensils className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Ver Menú
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Restaurant info cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Visítanos</h3>
                <p className="text-gray-600 text-sm">
                  Ven a disfrutar de nuestra cocina tradicional en un ambiente acogedor
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Especialidades</h3>
                <p className="text-gray-600 text-sm">
                  Pollos asados, costillas y platos con recetas caseras
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Reserva</h3>
                <p className="text-gray-600 text-sm">
                  Llámanos para hacer tu reserva y asegurar tu pedido
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Fun message */}
        <motion.div
          className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-8 border border-red-200"
          variants={itemVariants}
        >
          <motion.div
            className="text-4xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            😋
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            ¡El error está en la página, no en la comida!
          </h3>
          <p className="text-gray-600 text-lg">
            Mientras arreglamos este pequeño problema, 
            nuestros chefs siguen preparando los mejores platos para ti.
          </p>
        </motion.div>

        {/* Back button */}
        <motion.div
          className="mt-12"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="text-gray-600 hover:text-red-600 px-6 py-3 text-lg group"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                Volver Atrás
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom wave decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-100 to-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </div>
  )
}
