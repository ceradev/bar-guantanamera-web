"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { Mojo } from "@/types/menu"
import { staggerContainer, fadeInUp } from "./animations"

interface MojosSectionProps {
  items: Mojo[]
}

export const MojosSection = ({ items }: MojosSectionProps) => {
  return (
    <motion.div variants={staggerContainer} className="h-full">
      <motion.div 
        variants={fadeInUp as any}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 h-full w-full"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Mojos y Salsas
          </h3>
          <div className="w-16 h-1.5 bg-red-600 rounded-full" />
        </div>

        {/* List */}
        <div className="flex flex-col space-y-0">
          {items.map((mojo) => (
            <div 
              key={mojo.name} 
              className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-lg group"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-800 font-medium text-base group-hover:text-red-600 transition-colors">
                  {mojo.name}
                </span>
                {mojo.spicy && (
                  <span className="text-[10px] text-red-500 border border-red-200 bg-red-50 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                    Picante
                  </span>
                )}
              </div>
              <span className="text-red-600 font-bold text-base">{mojo.price}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
