"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp, scaleIn } from "../menu/animations"

const stats = [
  { value: "23+", label: "AÑOS" },
  { value: "30+", label: "PLATOS" },
  { value: "4.3", label: "VALORACIÓN" },
]

export default function AboutStory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto my-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Image */}
          <motion.div
            className="relative w-full h-full rounded-2xl overflow-hidden bg-secondary group"
            variants={scaleIn}
          >
            <Image
              src="/images/about/about-restaurant.jpg"
              alt="Interior del Bar Guantanamera"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text */}
          <motion.div variants={staggerContainer}>
            <motion.p
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-2"
              variants={fadeInUp}
            >
              QUIENES SOMOS
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance"
              variants={fadeInUp}
            >
              {"Tradición Canaria con un "}
              <span className="text-primary font-normal">Enfoque Moderno</span>
            </motion.h2>

            <motion.div
              className="mt-6 flex flex-col gap-4 text-muted-foreground font-body leading-relaxed"
              variants={fadeInUp}
            >
              <p>
                {"Desde hace más de 20 años, Bar Cafetería Guantanamera ha sido un punto de encuentro en Tenerife para quienes buscan el sabor auténtico de la cocina casera. Lo que comenzó como un sueño familiar se ha consolidado gracias a nuestras recetas propias y al respeto por el producto local."}
              </p>
              <p>
                {"Hoy evolucionamos para estar más cerca de ti. Combinamos nuestra maestría en platos icónicos como los pollos, costillas y la pata asada con una plataforma digital diseñada para que disfrutes de nuestra esencia con la máxima comodidad."}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 mt-10 border-t border-border pt-8"
              variants={fadeInUp}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
