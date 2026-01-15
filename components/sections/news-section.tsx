"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

import { newsItems, type NewsItem } from "@/data/news"

const AUTOPLAY_INTERVAL = 5000 // 5 segundos

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null)

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = newsItems.length - 1
      if (nextIndex >= newsItems.length) nextIndex = 0
      return nextIndex
    })
  }, [])

  useEffect(() => {
    if (isPaused || selectedItem) return

    const timer = setInterval(() => {
      paginate(1)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [isPaused, paginate, selectedItem])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const currentItem = newsItems[currentIndex]

  return (
    <section id="news" className="py-16 md:py-24 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {/* Header - Styled like MenuHeader */}
        <div className="text-center mb-16">
          <Badge className="bg-red-50 hover:bg-red-100 text-red-600 mb-4 px-4 py-1 text-sm uppercase tracking-wider">
            <Bell className="w-3.5 h-3.5 mr-2" />
            Actualidad
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight mt-2">
            Novedades <span className="text-red-600">de la Casa</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg mb-8">
            Lo último de nuestra casa para ti, siempre fresco y al día.
          </p>
        </div>

        {/* Carousel Container - Floating Card Style */}
        <div className="relative p-2 md:p-4">
          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-gradient-to-r from-red-100/50 via-orange-50/30 to-red-50/50 blur-3xl rounded-[100%] -z-10" />

          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-white group aspect-[4/5] md:aspect-[21/9] ring-1 ring-gray-100"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 md:p-16 text-white pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-3xl"
                  >
                    <div className="flex justify-center mb-2 md:mb-4">
                      <Badge className="bg-white/10 text-white border border-white/20 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium backdrop-blur-md shadow-sm flex items-center gap-2 rounded-full">
                        {currentItem.icon}
                        {currentItem.tag}
                      </Badge>
                    </div>

                    <h3 className="text-2xl md:text-5xl lg:text-6xl font-black mb-2 md:mb-4 leading-tight tracking-tight drop-shadow-lg font-heading">
                      {currentItem.title}
                    </h3>

                    <p className="text-white/90 text-sm md:text-xl leading-relaxed mb-6 md:mb-8 drop-shadow-md mx-auto max-w-2xl font-medium line-clamp-3 md:line-clamp-none">
                      {currentItem.shortDescription}
                    </p>

                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 font-bold text-sm md:text-base px-6 py-4 md:px-8 md:py-6 rounded-xl shadow-lg hover:shadow-red-600/30 group/btn pointer-events-auto transform hover:-translate-y-0.5"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedItem(currentItem)
                        }}
                      >
                        {currentItem.cta}
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="absolute bottom-8 right-8 md:right-16 flex gap-3 z-20">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white/40 hover:bg-white/60"
                  )}
                  aria-label={`Ir a noticia ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <NewsDialog item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </section>
  )
}
