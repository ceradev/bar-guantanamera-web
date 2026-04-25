"use client"

import { motion } from "framer-motion"
import RestaurantGuruBadge from "@/components/common/restaurant-guru-badge"
import { fadeInUp, staggerContainer } from "../menu/animations"

export default function AwardsSection() {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center md:text-left max-w-sm" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              NUESTROS <span className="text-primary">RECONOCIMIENTOS</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm md:text-base">
              Trabajamos cada día para ofrecerte el mejor servicio y la mejor calidad en cada plato.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            variants={fadeInUp}
          >
            <div className="grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-105">
              <RestaurantGuruBadge variant="static" />
            </div>
            {/* Aquí se pueden añadir futuros premios/logos */}
            {/* 
            <div className="opacity-40 grayscale h-20 flex items-center">
              <span className="text-xs font-bold tracking-widest text-muted-foreground italic">PRÓXIMAMENTE</span>
            </div> 
            */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
