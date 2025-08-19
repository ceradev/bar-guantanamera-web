"use client"

import { Button } from "@/components/ui/button"
import { Phone, ShoppingBag, Bike } from "lucide-react"
import Link from "next/link"
import { motion, easeOut, useInView, backOut } from "framer-motion"
import { useRef } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: backOut,
    },
  },
}

const phoneVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: backOut,
      delay: 0.4,
    },
  },
}

export default function OrderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="pedir" className="w-full scroll-mt-16 bg-gray-50 py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">¿Hambre? ¡Pide Ahora!</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Elige tu plataforma preferida o llámanos directamente. ¡Te lo llevamos a casa!
          </p>
        </motion.div>
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-center text-xl font-semibold text-black">Pide por App</h3>
              <motion.div variants={buttonVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button size="lg" className="h-14 w-full bg-black text-white hover:bg-gray-800" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                      </motion.div>
                      Pedir en Uber Eats
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button size="lg" className="h-14 w-full bg-black text-white hover:bg-gray-800" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      <motion.div
                        animate={{ x: [0, 3, -3, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                      >
                        <Bike className="mr-2 h-5 w-5" />
                      </motion.div>
                      Pedir en Glovo
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <h3 className="text-center text-xl font-semibold text-black">Pedido Directo</h3>
              <motion.div
                className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center"
                variants={buttonVariants}
                whileHover={{
                  borderColor: "#ef4444",
                  transition: { duration: 0.3 },
                }}
              >
                <p className="font-semibold text-black">Pedidos por la web</p>
                <motion.p
                  className="text-lg font-bold text-red-600"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 2,
                  }}
                >
                  ¡PRÓXIMAMENTE!
                </motion.p>
                <p className="text-sm text-gray-600">Estamos trabajando para que pidas directamente desde aquí.</p>
              </motion.div>
              <motion.div className="text-center" variants={phoneVariants}>
                <p className="text-gray-700">O llámanos:</p>
                <motion.a
                  href="tel:912345678"
                  className="mt-1 inline-block text-2xl font-bold text-black hover:text-red-600 sm:text-3xl transition-colors"
                >
                  <motion.span
                    className="mr-2 inline-block"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 4,
                    }}
                  >
                    <Phone className="h-6 w-6" />
                  </motion.span>
                  912 345 678
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
