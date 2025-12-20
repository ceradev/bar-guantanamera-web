"use client"

import { motion } from "framer-motion"
import { Utensils } from "lucide-react"
import { ComboMeal } from "@/types/menu"
import { staggerContainer, fadeInUp } from "./animations"

interface ComboMealsSectionProps {
  combos: ComboMeal[]
}

export const ComboMealsSection = ({ combos }: ComboMealsSectionProps) => (
  <motion.div variants={staggerContainer} className="mb-20">
    <motion.div 
      variants={fadeInUp as any}
      className="flex flex-col items-center mb-8"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Platos Combinados
      </h3>
      <div className="w-16 h-1 bg-red-600 rounded-full" />
    </motion.div>

    <div className="grid md:grid-cols-3 gap-6">
      {combos.map((combo) => (
        <motion.div
          key={combo.name}
          variants={fadeInUp as any}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div className="relative h-48 bg-red-50 flex items-center justify-center overflow-hidden group-hover:bg-red-100 transition-colors duration-300">
            <div className="text-8xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
              {combo.icon}
            </div>
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold shadow-md z-10">
              {combo.price}
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-bold text-gray-900 mb-2">{combo.name}</h4>
            <p className="text-gray-600 text-sm font-medium leading-relaxed">
              {combo.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)
