"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { staggerContainer, fadeInUp } from "../sections/menu/animations"

interface PageHeroProps {
  image: string
  imageAlt: string
  subtitle: string
  titleWhite: string
  titleRed: string
  description: string
}

export default function PageHero({
  image,
  imageAlt,
  subtitle,
  titleWhite,
  titleRed,
  description,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax effect: image moves slower than scroll (0 to 30%)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          className="text-sm md:text-base text-background/80 italic font-body mb-4"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-background leading-none mb-2"
          variants={fadeInUp}
        >
          {titleWhite}
        </motion.h1>
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-regular tracking-tight text-primary leading-none mb-6"
          variants={fadeInUp}
        >
          {titleRed}
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-background/80 font-body max-w-2xl mx-auto leading-relaxed"
          variants={fadeInUp}
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-white/80 hover:text-white transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
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
    </motion.section>
  )
}
