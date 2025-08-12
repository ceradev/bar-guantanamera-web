"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Flame, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const logoVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "backOut",
      delay: 0.2,
    },
  },
}

const navVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.4,
      staggerChildren: 0.1,
    },
  },
}

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#menu", label: "Menú" },
    { href: "#galeria", label: "Galería" },
    { href: "#opiniones", label: "Opiniones" },
    { href: "#ubicacion", label: "Ubicación" },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <motion.div variants={logoVariants}>
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
              <Flame className="h-6 w-6 text-red-600" />
            </motion.div>
            <span className="text-xl font-bold text-black">Guantanamera</span>
          </Link>
        </motion.div>

        <motion.nav className="hidden items-center gap-6 text-sm font-medium md:flex" variants={navVariants}>
          {navLinks.map((link, index) => (
            <motion.div key={link.href} variants={navItemVariants}>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href={link.href} className="text-gray-700 transition-colors hover:text-red-600" prefetch={false}>
                  {link.label}
                </Link>
              </motion.div>
            </motion.div>
          ))}
          <motion.div variants={navItemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <Button asChild size="sm" className="bg-red-600 text-white shadow-md shadow-red-500/20 hover:bg-red-700">
                <a href="#pedir">Pedir Ahora</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.nav>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
                <Button variant="ghost" size="icon">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMenuOpen ? "close" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </motion.div>
                  </AnimatePresence>
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-white">
              <motion.div
                className="flex h-full flex-col"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <Link
                    href="#"
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
                <motion.div
                  className="mt-6 grid gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                      },
                    },
                  }}
                >
                  {[...navLinks, { href: "#pedir", label: "Pedir Ahora" }].map((link, index) => (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.4, ease: "easeOut" },
                        },
                      }}
                    >
                      <SheetClose asChild>
                        <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
                          <Link
                            href={link.href}
                            className="rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 block"
                            prefetch={false}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      </SheetClose>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
