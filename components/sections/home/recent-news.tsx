"use client"

import { useState } from "react"
import Image from "next/image"
import { newsItems } from "@/data/news"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function RecentNews() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(newsItems.length / itemsPerPage)
  const currentItems = newsItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            DESDE NUESTRA COCINA
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Novedades recientes
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <article
                key={item.id}
                className="bg-card rounded-xl overflow-hidden border border-border group"
              >
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4 line-clamp-3">
                    {item.shortDescription}
                  </p>
                  <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                    {item.cta || "Read more"}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    i === currentPage
                      ? "bg-primary"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Pagina ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
