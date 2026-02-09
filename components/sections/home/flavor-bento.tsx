"use client"

import Image from "next/image"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp, scaleIn } from "../menu/animations"

export default function FlavorBento() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-2"
            variants={fadeInUp}
          >
            SABOR AUTENTICO EN CADA DETALLE
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground text-balance"
            variants={fadeInUp}
          >
            El Sabor que se Ve
          </motion.h2>
          <motion.div
            className="w-40 h-0.5 bg-primary mx-auto mt-4"
            variants={fadeInUp}
          />
        </motion.div>

        {/* Desktop: 3-column bento grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 gap-4 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          style={{ gridTemplateRows: "200px 200px 200px" }}
        >
          {/* Maestría culinaria - Large (col 1-2, row 1-2) */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-kitchen.png"
              alt="Maestria culinaria en la cocina"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                THE KITCHEN
              </p>
              <h3 className="text-2xl font-bold text-background">
                {"Maestría culinaria"}
              </h3>
              <p className="text-sm text-background/80 font-body mt-1">
                Las recetas que nos han definido por décadas.
              </p>
            </div>
          </motion.div>

          {/* Calidad de Origen - Text card (col 3, row 1) */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-card border border-border p-5 flex flex-col justify-center"
            style={{ gridColumn: "3", gridRow: "1" }}
            variants={fadeInUp}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">
              Calidad de Origen
            </h3>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              Seleccionamos cada producto pensando en la frescura. Desde nuestros pollos asados hasta nuestras guarniciones.
            </p>
          </motion.div>

          {/* Autenticidad Canaria - Tall (col 3, row 2-3) */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            style={{ gridColumn: "3", gridRow: "2 / 4" }}
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-quality.png"
              alt="Autenticidad Canaria"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-4 right-4 z-10 text-right">
              <h3 className="text-base font-bold text-background">
                Autenticidad<br />Canaria
              </h3>
            </div>
          </motion.div>

          {/* Tradición y Familia - Small (col 1, row 3) */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            style={{ gridColumn: "1", gridRow: "3" }}
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-tradition.png"
              alt="Tradicion y Familia"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-base font-bold text-background">
                {"Tradición y Familia"}
              </h3>
            </div>
          </motion.div>

          {/* Small image (col 2, row 3) */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            style={{ gridColumn: "2", gridRow: "3" }}
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-canaria.png"
              alt="Cocina canaria"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
          </motion.div>
        </motion.div>

        {/* Mobile: Simple 2-column grid */}
        <motion.div
          className="grid md:hidden grid-cols-2 gap-3 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Maestría culinaria - Large (spans 2 cols) */}
          <motion.div
            className="col-span-2 relative rounded-2xl overflow-hidden group h-[280px]"
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-kitchen.png"
              alt="Maestria culinaria en la cocina"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 z-10">
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                THE KITCHEN
              </p>
              <h3 className="text-xl font-bold text-background">
                {"Maestría culinaria"}
              </h3>
              <p className="text-sm text-background/80 font-body mt-1">
                Las recetas que nos han definido por décadas.
              </p>
            </div>
          </motion.div>

          {/* Calidad de Origen - Text card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-card border border-border p-4 flex flex-col justify-center h-[180px]"
            variants={fadeInUp}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Heart className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1">
              Calidad de Origen
            </h3>
            <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-3">
              Seleccionamos cada producto pensando en la frescura.
            </p>
          </motion.div>

          {/* Autenticidad Canaria */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group h-[180px]"
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-canaria.png"
              alt="Autenticidad Canaria"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-3 left-3 z-10">
              <h3 className="text-sm font-bold text-background">
                Autenticidad Canaria
              </h3>
            </div>
          </motion.div>

          {/* Tradición y Familia */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group h-[180px]"
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-tradition.png"
              alt="Tradicion y Familia"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-3 left-3 z-10">
              <h3 className="text-sm font-bold text-background">
                {"Tradición y Familia"}
              </h3>
            </div>
          </motion.div>

          {/* Small image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden group h-[180px]"
            variants={scaleIn}
          >
            <Image
              src="/images/home/bento-quality.png"
              alt="Cocina canaria"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
