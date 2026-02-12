
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MainNav, RightNav } from "@/components/layout/main-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { CartButton } from "@/components/layout/cart-button"
import { useScroll } from "@/hooks/use-scroll"

const SiteHeader = () => {
  const isScrolled = useScroll()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-20 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background border-b border-border"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 relative">

        {/* Left nav links - Desktop */}
        <MainNav />

        {/* Center logo */}
        <Link
          href="/"
          className="flex flex-col items-start md:items-center"
          prefetch={false}
        >
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Guantanamera
          </span>
          <span className="text-xs text-muted-foreground font-medium -mt-0.5">
            23 años a su servicio
          </span>
        </Link>

        {/* Right nav + actions - Desktop */}
        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          <RightNav />

          <CartButton />

          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 rounded-sm px-6"
          >
            <Link href="/encargar">PEDIR AHORA</Link>
          </Button>
        </div>

        {/* Mobile: right side */}
        <div className="flex items-center gap-1 md:hidden ml-auto">
          <CartButton iconSize="h-6 w-6" />
          <MobileNav />
        </div>
      </div>
    </header >
  )
}

export default SiteHeader
