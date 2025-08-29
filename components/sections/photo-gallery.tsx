"use client";

import Image from "next/image";
import { motion, easeOut, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wave } from "@/components/ui/wave";
import galleryData from "@/data/gallery-data.json";
import { GalleryImage } from "@/types/gallery";

const images: GalleryImage[] = galleryData.images;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const lightboxVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const imageModalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: { scale: 0.8, opacity: 0 },
};

export default function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <section
      id="galeria"
      className="relative w-full scroll-mt-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-20 md:py-28"
      ref={ref}
    >
      {/* Top Wave */}
      <Wave position="top" />

      {/* Bottom Wave */}
      <Wave position="bottom" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span className="text-red-600 text-sm font-medium tracking-wide">
              GALERÍA
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
            Un Vistazo a <span className="text-red-600">Guantanamera</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
            Descubre la esencia de nuestro restaurante a través de imágenes que
            capturan nuestros sabores, ambiente acogedor y los momentos
            especiales que compartimos contigo.
          </p>
        </motion.div>

        {/* Responsive Grid Gallery */}
        <motion.div
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Mobile Grid - Simple layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index + image.alt}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                variants={imageVariants}
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative w-full aspect-square">
                  {image.isVideo ? (
                    <video
                      src={image.src}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                      <p className="text-white text-sm font-medium leading-tight mb-2">
                        {image.alt}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {image.isVideo ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Grid - Original layout with specific positions */}
          <div className="hidden lg:grid grid-cols-8 gap-3" style={{ minHeight: '350px' }}>
            {images.map((image, index) => (
              <motion.div
                key={index + image.alt}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                style={{
                  gridColumn: `${image.x + 1} / span ${image.w}`,
                  gridRow: `${image.y + 1} / span ${image.h}`,
                }}
                variants={imageVariants}
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative w-full h-full">
                  {image.isVideo ? (
                    <video
                      src={image.src}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ aspectRatio: '1 / 1' }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                      <p className="text-white text-sm font-medium leading-tight mb-2">
                        {image.alt}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        {image.isVideo ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">
              ¿Te gusta lo que ves?
            </h3>
            <p className="text-gray-600 mb-6">
              Ven a vivir la experiencia Guantanamera en persona. Te esperamos
              con los brazos abiertos.
            </p>
            <Button
              asChild
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="#pedir">Hacer Reserva</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white border-0 rounded-full backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white border-0 rounded-full backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white border-0 rounded-full backdrop-blur-sm"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Image Container */}
            <motion.div
              className="relative max-w-4xl max-h-[80vh] mx-4"
              variants={imageModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                {selectedImage.isVideo ? (
                  <video
                    src={selectedImage.src}
                    className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    width={800}
                    height={600}
                    className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                  />
                )}
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">
                  {selectedImage.category}
                </span>
                <h3 className="text-white text-xl font-bold mb-1">
                  {selectedImage.alt}
                </h3>
                <p className="text-white/80 text-sm">
                  {selectedImage.isVideo ? 'Video' : 'Imagen'} {currentIndex + 1} de {images.length}
                </p>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
