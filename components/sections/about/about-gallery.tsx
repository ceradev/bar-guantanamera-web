"use client"

import Image from "next/image"
import Link from "next/link"
import galleryData from "@/data/gallery.json"

export default function AboutGallery() {
  // Take first 5 images for the grid layout: 1 large left, 2+2 right
  const images = galleryData.images.filter((img) => !img.src.includes(".mp4")).slice(0, 5)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {"GALERIA"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Nuestra esencia
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        </div>

        {/* Gallery Grid - matching design: 1 large on left, 2x2 on right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Large image left */}
          {images[0] && (
            <div className="md:row-span-2 relative rounded-xl overflow-hidden bg-secondary min-h-[300px] md:min-h-0">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}

          {/* Top right 2 images */}
          {images[1] && (
            <div className="relative rounded-xl overflow-hidden bg-secondary min-h-[200px]">
              <Image
                src={images[1].src}
                alt={images[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
          {images[2] && (
            <div className="relative rounded-xl overflow-hidden bg-secondary min-h-[200px]">
              <Image
                src={images[2].src}
                alt={images[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}

          {/* Bottom right 2 images */}
          {images[3] && (
            <div className="relative rounded-xl overflow-hidden bg-secondary min-h-[200px]">
              <Image
                src={images[3].src}
                alt={images[3].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
          {images[4] && (
            <div className="relative rounded-xl overflow-hidden bg-secondary min-h-[200px]">
              <Image
                src={images[4].src}
                alt={images[4].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="https://www.instagram.com/guantanamera.bar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            {"VER LA GALERIA COMPLETA"}
          </Link>
        </div>
      </div>
    </section>
  )
}
