"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp, scaleIn } from "../menu/animations"

export default function HomeHero() {
  return (
    <motion.section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/hero-home.jpg"
          alt="Pollos asados - Especialidad Guantanamera"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          className="text-sm md:text-base text-background/80 italic font-body mb-4"
          variants={fadeInUp}
        >
          Saborea la diferencia
        </motion.p>
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-background leading-none mb-2"
          variants={fadeInUp}
        >
          SABORES
        </motion.h1>
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-regular tracking-tight text-primary leading-none mb-2"
          variants={fadeInUp}
        >
          AUTENTICOS
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-background/80 font-body max-w-2xl mx-auto leading-relaxed mb-10"
          variants={fadeInUp}
        >
          {"Crujiente por fuera, jugoso por dentro. Especialidad en pollos, costillas y patas asadas con la "}
          <span className="text-primary">receta casera</span>
          {" que nos define."}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={fadeInUp}
        >
          <Link
            href="/menu"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-semibold tracking-wide rounded-sm px-8 py-3 text-sm"
          >
            VER EL MENU
            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </Link>
          <span className="text-background/80 text-lg md:text-xl font-semibold px-2">
            |
          </span>
          <a
            href="tel:+34922173039"
            className="inline-flex items-center justify-center border-2 border-background/40 text-background hover:bg-background/10 hover:border-background/60 bg-transparent font-semibold tracking-wide rounded-sm px-8 py-3 text-sm transition-all duration-300"
          >
            <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            LLAMAR AHORA
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-white/80 hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10"
          >
            <path d="m7 13 5 5 5-5" />
            <path d="m7 6 5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.section >
  )
}
