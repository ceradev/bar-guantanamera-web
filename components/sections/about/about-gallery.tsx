"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import galleryData from "@/data/gallery.json"
import { staggerContainer, fadeInUp, scaleIn } from "../menu/animations"

interface GalleryImage {
  src: string
  alt: string
  category: string
  isVideo?: boolean
}

export default function AboutGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Filter out videos and get all images
  const allImages = galleryData.images.filter(
    (img): img is GalleryImage => !img.src.includes(".mp4")
  )

  // Take specific images for the grid layout to show variety
  const selectedIndices = [6, 7, 8, 0, 1]
  const displayImages = selectedIndices.map(index => allImages[index]).filter(Boolean)

  const openModal = (index: number = 0) => {
    setSelectedIndex(index)
    setIsModalOpen(true)
    // Prevent body scroll
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

  return (
    <>
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
              {"GALERÍA"}
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-foreground text-balance"
              variants={fadeInUp}
            >
              Nuestra esencia
            </motion.h2>
            <motion.div
              className="w-40 h-0.5 bg-primary mx-auto mt-4"
              variants={fadeInUp}
            />
          </motion.div>

          {/* Gallery Grid - matching design: 1 large on left, 2x2 on right */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Large image left */}
            {displayImages[0] && (
              <motion.div
                className="md:row-span-2 relative rounded-xl overflow-hidden bg-secondary min-h-[500px] md:min-h-0 group cursor-pointer"
                variants={scaleIn}
                onClick={() => openModal(selectedIndices[0])}
              >
                <Image
                  src={displayImages[0].src}
                  alt={displayImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              </motion.div>
            )}

            {/* Top right 2 images */}
            {displayImages[1] && (
              <motion.div
                className="relative rounded-xl overflow-hidden bg-secondary min-h-[300px] group cursor-pointer"
                variants={scaleIn}
                onClick={() => openModal(selectedIndices[1])}
              >
                <Image
                  src={displayImages[1].src}
                  alt={displayImages[1].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              </motion.div>
            )}
            {displayImages[2] && (
              <motion.div
                className="relative rounded-xl overflow-hidden bg-secondary min-h-[300px] group cursor-pointer"
                variants={scaleIn}
                onClick={() => openModal(selectedIndices[2])}
              >
                <Image
                  src={displayImages[2].src}
                  alt={displayImages[2].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              </motion.div>
            )}

            {/* Bottom right 2 images */}
            {displayImages[3] && (
              <motion.div
                className="relative rounded-xl overflow-hidden bg-secondary min-h-[300px] group cursor-pointer"
                variants={scaleIn}
                onClick={() => openModal(selectedIndices[3])}
              >
                <Image
                  src={displayImages[3].src}
                  alt={displayImages[3].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              </motion.div>
            )}
            {displayImages[4] && (
              <motion.div
                className="relative rounded-xl overflow-hidden bg-secondary min-h-[300px] group cursor-pointer"
                variants={scaleIn}
                onClick={() => openModal(selectedIndices[4])}
              >
                <Image
                  src={displayImages[4].src}
                  alt={displayImages[4].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              onClick={() => openModal(selectedIndices[0])}
              className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors cursor-pointer"
            >
              {"VER LA GALERÍA COMPLETA"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Full Gallery Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-foreground/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 z-10 p-3 rounded-full bg-primary text-background hover:bg-primary/80 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 z-10 p-3 rounded-full bg-primary text-background hover:bg-primary/80 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main image */}
            <motion.div
              key={selectedIndex}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={allImages[selectedIndex]?.src || ""}
                alt={allImages[selectedIndex]?.alt || ""}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Image counter and caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-background">
              <p className="text-sm opacity-80">
                {selectedIndex + 1} / {allImages.length}
              </p>
              <p className="text-sm mt-1">
                {allImages[selectedIndex]?.alt}
              </p>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] pb-2">
              {allImages.map((img, index) => (
                <button
                  key={img.src + index}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 transition-all ${index === selectedIndex
                    ? "ring-2 ring-primary scale-110"
                    : "opacity-60 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
