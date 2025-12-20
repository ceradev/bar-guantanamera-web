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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">

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
            className="text-9xl md:text-[12rem] font-bold text-gray-100 leading-none"
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Main message */}
        <motion.div
          className="mb-12 -mt-20 md:-mt-32 relative z-20"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-red-50 px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChefHat className="w-6 h-6 text-red-600" />
            <span className="text-red-600 font-semibold text-lg">¡Ups! Página no encontrada</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Parece que te has perdido en el camino
          </h2>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
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
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
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
                className="border-2 border-gray-200 text-gray-700 hover:border-red-600 hover:text-red-600 px-8 py-6 text-lg rounded-full shadow-sm hover:shadow-md transition-all duration-300 group bg-white"
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
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visítanos</h3>
                <p className="text-gray-500 text-sm">
                  Ven a disfrutar de nuestra cocina tradicional en un ambiente acogedor
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Especialidades</h3>
                <p className="text-gray-500 text-sm">
                  Pollos asados, costillas y platos con recetas caseras
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reserva</h3>
                <p className="text-gray-500 text-sm">
                  Llámanos para hacer tu reserva y asegurar tu pedido
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Fun message */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
          variants={itemVariants}
        >
          <motion.div
            className="text-4xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            😋
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            ¡El error está en la página, no en la comida!
          </h3>
          <p className="text-gray-500 text-lg">
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
                className="text-gray-400 hover:text-red-600 px-6 py-3 text-lg group hover:bg-transparent"
              >
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                Volver Atrás
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
