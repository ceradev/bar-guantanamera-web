"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

interface RestaurantGuruBadgeProps {
  variant?: "floating" | "static"
}

export default function RestaurantGuruBadge({ variant = "floating" }: RestaurantGuruBadgeProps) {
  useEffect(() => {
    // Cargar el CSS de Restaurant Guru
    const link = document.createElement("link")
    link.href = "https://awards.infcdn.net/2024/circ5_n.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    return () => {
      // Opcionalmente remover el CSS al desmontar
      // document.head.removeChild(link)
    }
  }, [])

  const containerClasses = variant === "floating" 
    ? "fixed bottom-6 left-6 z-40 hidden md:block" 
    : "inline-block my-4"

  return (
    <motion.div
      className={containerClasses}
      initial={variant === "floating" ? { opacity: 0, x: -50 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div 
        id="b-rcirc5" 
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.nodeName.toLowerCase() !== 'a') {
            const link = document.querySelector('.b-rcirc_bot_title') as HTMLAnchorElement
            if (link) window.open(link.href, '_blank')
          }
        }}
      >
        <div className="circ_cont"> 
          <img 
            className="circ_img" 
            src="https://awards.infcdn.net/img/star_red.svg" 
            alt="star" 
          />
          <a 
            href="https://restaurantguru.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="b-rcirc_top_title"
          >
            Restaurant Guru 2026
          </a>
          <p className="b-rcirc_ttl">Recomendado</p>
          <a 
            href="https://es.restaurantguru.com/bar-Guantanamera-San-Isidro-Canary-Islands" 
            className="b-rcirc_bot_title" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Bar Guantanamera
          </a>
        </div>
      </div>
    </motion.div>
  )
}
