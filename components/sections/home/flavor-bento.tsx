"use client"

import Image from "next/image"
import { Heart } from "lucide-react"

export default function FlavorBento() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            SABOR AUTENTICO EN CADA DETALLE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            El Sabor que se Ve
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[auto] gap-3 md:gap-4 max-w-6xl mx-auto">
          {/* Large left - Kitchen/Cooking */}
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group min-h-[300px] md:min-h-[450px]">
            <Image
              src="/images/bento-kitchen.jpg"
              alt="Maestria culinaria en la cocina"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 z-10">
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                THE KITCHEN
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-background">
                {"Maestria culinaria"}
              </h3>
              <p className="text-sm text-background/80 font-body mt-1">
                Las recetas que nos han definido por decadas.
              </p>
            </div>
          </div>

          {/* Top right - Quality card */}
          <div className="col-span-2 relative rounded-2xl overflow-hidden bg-card border border-border">
            <div className="flex flex-col md:flex-row items-start">
              <div className="p-5 md:p-6 flex-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Calidad de Origen
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  Seleccionamos cada producto pensando en la frescura. Desde nuestros pollos asados hasta nuestras guarniciones, trabajamos con proveedores que garantizan el sabor casero de siempre.
                </p>
              </div>
              <div className="relative w-full md:w-40 h-32 md:h-full md:min-h-[180px] flex-shrink-0">
                <Image
                  src="/images/bento-quality.jpg"
                  alt="Ingredientes de calidad"
                  fill
                  className="object-cover md:rounded-r-2xl"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </div>
          </div>

          {/* Bottom right - Two smaller cards */}
          <div className="relative rounded-2xl overflow-hidden group min-h-[200px]">
            <Image
              src="/images/bento-tradition.jpg"
              alt="Tradicion y Familia"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-base md:text-lg font-bold text-background">
                {"Tradicion y Familia"}
              </h3>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group min-h-[200px]">
            <Image
              src="/images/bento-canaria.jpg"
              alt="Autenticidad Canaria"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-base md:text-lg font-bold text-background">
                Autenticidad Canaria
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
