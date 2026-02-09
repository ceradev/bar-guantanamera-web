"use client"

import { useState } from "react"
import Image from "next/image"
import { newsItems } from "@/data/news"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, fadeInUp } from "../menu/animations"

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
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-2"
            variants={fadeInUp}
          >
            DESDE NUESTRA COCINA
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-foreground text-balance"
            variants={fadeInUp}
          >
            Novedades recientes
          </motion.h2>
          <motion.div
            className="w-40 h-0.5 bg-primary mx-auto mt-4"
            variants={fadeInUp}
          />
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation arrows - Red solid style */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-primary text-white hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground flex items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-primary text-white hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground flex items-center justify-center transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {currentItems.map((item) => (
              <motion.article
                key={item.id}
                className="bg-card rounded-xl overflow-hidden border border-border group"
                variants={fadeInUp}
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
                  <span className="text-sm font-semibold text-primary hover:text-primary/80 hover:underline hover:underline-offset-4 transition-all duration-300 cursor-pointer">
                    {item.cta || "Read more"}
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Pagination dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-3 w-3 rounded-full transition-colors ${i === currentPage
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
