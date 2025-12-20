"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { fadeInUp } from "./animations"
import { ForkKnife } from "lucide-react"

export const MenuHeader = () => (
  <motion.div
    variants={fadeInUp as any}
    className="text-center mb-16"
  >
    <Badge className="bg-red-600 hover:bg-red-700 text-white mb-4 px-4 py-1 text-sm uppercase tracking-wider">
      <ForkKnife className="inline-block mr-2 w-4 h-4" />
      Nuestra Especialidad
    </Badge>
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight mt-2">
      Carta <span className="text-red-600">Guantanamera</span>
    </h2>
    <p className="text-gray-500 max-w-xl mx-auto text-lg mb-8">
      Disfruta de una experiencia gastronómica única, desde nuestros clásicos hasta nuevas creaciones.
    </p>
  </motion.div>
)
