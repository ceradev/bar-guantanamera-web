"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { Badge } from "@/components/ui/badge"

const navLinks = [
  { href: "/sobre-nosotros", label: "SOBRE NOSOTROS" },
  { href: "/menu", label: "MENU" },
  { href: "/contacto", label: "CONTACTO" },
]

const SiteHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { count } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-20 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background border-b border-border"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Left nav links - Desktop */}
        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold tracking-wide transition-colors duration-200",
                isActive(link.href)
                  ? "text-primary underline underline-offset-8 decoration-2"
                  : "text-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center logo */}
        <Link href="/" className="flex flex-col items-center" prefetch={false}>
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            Guantanamera
          </span>
          <span className="text-xs text-muted-foreground font-medium -mt-0.5">
            23 años a su servicio
          </span>
        </Link>

        {/* Right nav + actions - Desktop */}
        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold tracking-wide transition-colors duration-200",
                isActive(link.href)
                  ? "text-primary underline underline-offset-8 decoration-2"
                  : "text-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/encargar"
            className="p-2 text-foreground hover:text-primary transition-colors relative"
            title="Carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
              >
                {count}
              </Badge>
            )}
          </Link>

          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 rounded-sm px-6"
          >
            <Link href="/encargar">PEDIR AHORA</Link>
          </Button>
        </div>

        {/* Mobile: right side */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/encargar"
            className="p-2 text-foreground hover:text-primary transition-colors relative"
            title="Carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
              >
                {count}
              </Badge>
            )}
          </Link>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0 [&>button]:hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <Link
                  href="/"
                  className="flex flex-col"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl font-bold text-foreground">Guantanamera</span>
                  <span className="text-xs text-muted-foreground font-medium -mt-0.5">
                    23 anos a su servicio
                  </span>
                </Link>
                <SheetClose asChild>
                  <button
                    className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
                    aria-label="Cerrar menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </SheetClose>
              </div>

              <div className="px-6 py-8 flex flex-col gap-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 text-base font-semibold tracking-wide rounded-lg transition-colors",
                        isActive(link.href)
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-border pt-6">
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 rounded-sm"
                    size="lg"
                  >
                    <Link href="/encargar" onClick={() => setIsMobileMenuOpen(false)}>
                      PEDIR AHORA
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
