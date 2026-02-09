"use client"

import { Button } from "@/components/ui/button"
import { Utensils, Building2, Phone, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/menu?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 relative flex items-center justify-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/not-found/404-image.png"
            alt="Fondo"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay from gray to white */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white/95" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4 py-20 w-full max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Number */}
          <motion.h1
            className="text-[10rem] md:text-[14rem] font-black text-foreground leading-none mb-4 drop-shadow-lg"
            variants={scaleInVariants}
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-10 font-medium"
            variants={itemVariants}
          >
            ¿Buscas algo? Esta página ha abandonado el local.
          </motion.p>

          {/* Search Bar */}
          <motion.form onSubmit={handleSearch} className="mb-10" variants={itemVariants}>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscando un plato o otra página..."
                className="w-full bg-white rounded-lg px-5 py-4 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
                aria-label="Buscar"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </motion.form>

          {/* Navigation Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            variants={itemVariants}
          >
            <Link href="/menu">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/80 backdrop-blur-sm border-border text-foreground hover:bg-white hover:border-primary px-6 py-5 text-base rounded-lg font-semibold w-full sm:w-auto shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <Utensils className="mr-2 h-5 w-5 text-primary" />
                Nuestro Menú
              </Button>
            </Link>

            <Link href="/sobre-nosotros">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/80 backdrop-blur-sm border-border text-foreground hover:bg-white hover:border-primary px-6 py-5 text-base rounded-lg font-semibold w-full sm:w-auto shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <Building2 className="mr-2 h-5 w-5 text-primary" />
                Sobre nosotros
              </Button>
            </Link>

            <Link href="/contacto">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/80 backdrop-blur-sm border-border text-foreground hover:bg-white hover:border-primary px-6 py-5 text-base rounded-lg font-semibold w-full sm:w-auto shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5 text-primary" />
                Contacto
              </Button>
            </Link>
          </motion.div>

          {/* Back Link */}
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-semibold text-base transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver a la Página Principal
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  )
}
