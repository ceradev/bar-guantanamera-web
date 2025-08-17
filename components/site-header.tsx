"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Flame, Menu, X, ShoppingBag, Bike } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const headerVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const sections = ["home", "menu", "galeria", "opiniones", "ubicacion", "pedir"]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            // If we're in the hero/home section, clear active state
            if (sectionId === "home") {
              setActiveSection("")
            } else {
              setActiveSection(sectionId)
            }
          }
        })
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      },
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  const navLinks = [
    { href: "#menu", label: "Menú", id: "menu" },
    { href: "#galeria", label: "Galería", id: "galeria" },
    { href: "#opiniones", label: "Opiniones", id: "opiniones" },
    { href: "#ubicacion", label: "Ubicación", id: "ubicacion" },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2" prefetch={false}>
          <Flame className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold text-black">Guantanamera</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-2 transition-colors duration-200",
                activeSection === link.id && link.id !== "home"
                  ? "text-red-600 font-semibold"
                  : "text-gray-700 hover:text-red-600",
              )}
              prefetch={false}
            >
              {link.label}
              {activeSection === link.id && link.id !== "home" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                  layoutId="activeSection"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {/* Delivery Icons */}
          <div className="flex items-center gap-2">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-red-600 transition-colors"
              title="Pedir en Uber Eats"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-red-600 transition-colors"
              title="Pedir en Glovo"
            >
              <Bike className="h-5 w-5" />
            </Link>
          </div>

          <Button asChild size="sm" className="bg-red-600 text-white shadow-md shadow-red-500/20 hover:bg-red-700">
            <a href="#pedir">Pedir Ahora</a>
          </Button>
        </div>

        <div className="flex items-center gap-1 ml-auto md:hidden">
          {/* Delivery Icons for mobile */}
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-700 hover:text-red-600 transition-colors"
            title="Pedir en Uber Eats"
          >
            <ShoppingBag className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-700 hover:text-red-600 transition-colors"
            title="Pedir en Glovo"
          >
            <Bike className="h-4 w-4" />
          </Link>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-white">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link
                    href="#home"
                    className="flex items-center gap-2"
                    prefetch={false}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Flame className="h-6 w-6 text-red-600" />
                    <span className="text-xl font-bold text-black">Guantanamera</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[...navLinks, { href: "#pedir", label: "Pedir Ahora", id: "pedir" }].map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-lg px-3 py-3 text-base font-semibold transition-colors text-center",
                          activeSection === link.id && link.id !== "home"
                            ? "bg-red-50 text-red-600 border-2 border-red-600"
                            : "text-gray-800 hover:bg-gray-100 border-2 border-gray-200",
                        )}
                        prefetch={false}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
