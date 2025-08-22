"use client"

import { Flame } from "lucide-react"
import { motion, easeOut, useInView } from "framer-motion"
import { useRef } from "react"

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}

export default function SiteFooter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.footer
      className="bg-black"
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <motion.div className="flex items-center gap-2 text-white" variants={itemVariants}>
          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <Flame className="h-5 w-5 text-red-500" />
          </motion.div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Bar Restaurante Guantanamera</p>
            <p className="text-xs text-gray-300 font-medium -mt-0.5">23 años a su servicio</p>
          </div>
        </motion.div>
        <motion.p className="text-center text-sm text-gray-400 sm:text-right" variants={itemVariants}>
          © {new Date().getFullYear()} Guantanamera. Todos los derechos reservados.
        </motion.p>
      </div>
    </motion.footer>
  )
}
