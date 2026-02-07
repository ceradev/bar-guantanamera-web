"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const instagramImages = [
  { src: "/images/gallery/pollos-asados-1.jpg", alt: "Pollos asados" },
  { src: "/images/gallery/bar-entrada-1.jpg", alt: "Entrada del restaurante" },
  { src: "/images/gallery/costilla-asada-1.jpg", alt: "Costillas asadas" },
  { src: "/images/gallery/bar-terraza.jpg", alt: "Terraza" },
  { src: "/images/gallery/pata-asada-1.jpg", alt: "Pata asada" },
  { src: "/images/gallery/bar-cocina-1.jpg", alt: "Cocina" },
]

export default function InstagramSection() {
  return (
    <section className="bg-secondary/50 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
              SIGUENOS
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              @guantanamera.bar
            </h3>
          </div>
          <Link
            href="https://www.instagram.com/guantanamera.bar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Ver todos los post
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {instagramImages.map((img, index) => (
            <Link
              key={index}
              href="https://www.instagram.com/guantanamera.bar"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
