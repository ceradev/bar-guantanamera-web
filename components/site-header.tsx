"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Flame, Menu, X } from "lucide-react"

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#menu", label: "Menú" },
    { href: "#galeria", label: "Galería" },
    { href: "#opiniones", label: "Opiniones" },
    { href: "#ubicacion", label: "Ubicación" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Flame className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold text-black">Guantanamera</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 transition-colors hover:text-red-600"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="bg-red-600 text-white shadow-md shadow-red-500/20 hover:bg-red-700">
            <a href="#pedir">Pedir Ahora</a>
          </Button>
        </nav>

        <div className="md:hidden">
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
                <div className="mt-6 grid gap-4">
                  {[...navLinks, { href: "#pedir", label: "Pedir Ahora" }].map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100"
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
    </header>
  )
}
