"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Phone } from "lucide-react"

export default function HomeHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-home.jpg"
          alt="Pollos asados - Especialidad Guantanamera"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-sm md:text-base text-background/80 italic font-body mb-4">
          Saborea la diferencia
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-background leading-none mb-2">
          SABORES
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-none mb-8">
          AUTENTICOS
        </h1>
        <p className="text-base md:text-lg text-background/80 font-body max-w-2xl mx-auto leading-relaxed mb-10">
          {"Crujiente por fuera, jugoso por dentro. Especialidad en pollos, costillas y patas asadas con la "}
          <span className="text-primary underline">receta casera</span>
          {" que nos define."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide rounded-sm px-8"
          >
            <Link href="/menu">
              VER EL MENU
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-background/40 text-background hover:bg-background/10 hover:border-background/60 bg-transparent font-semibold tracking-wide rounded-sm px-8"
          >
            <a href="tel:+34922173039">
              <Phone className="mr-2 h-4 w-4" />
              LLAMAR AHORA
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
