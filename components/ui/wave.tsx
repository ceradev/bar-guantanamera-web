import { motion } from "framer-motion"

interface WaveProps {
  position: "top" | "bottom"
  className?: string
}

export function Wave({ position, className = "" }: Readonly<WaveProps>) {
  const wavePath = position === "top" 
    ? "M0 0C40 0 80 5 120 15C160 25 200 35 240 40C280 45 320 45 360 42C400 39 440 33 480 30C520 27 560 27 600 30C640 33 680 39 720 42C760 45 800 45 840 40C880 35 920 25 960 15C1000 5 1040 0 1080 0C1120 0 1160 5 1200 15C1240 25 1280 35 1320 40C1360 45 1400 45 1440 40L1440 0Z"
    : "M0 120C40 120 80 115 120 105C160 95 200 85 240 80C280 75 320 75 360 78C400 81 440 87 480 90C520 93 560 93 600 90C640 87 680 81 720 78C760 75 800 75 840 80C880 85 920 95 960 105C1000 115 1040 120 1080 120C1120 120 1160 115 1200 105C1240 95 1280 85 1320 80C1360 75 1400 75 1440 80L1440 120Z"

  return (
    <motion.div 
      className={`absolute ${position === "top" ? "top-0" : "bottom-0"} left-0 right-0 ${className}`}
      initial={{ opacity: 0, y: position === "top" ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <svg 
        viewBox="0 0 1440 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-auto min-h-[80px] max-h-[120px]"
        preserveAspectRatio="none"
      >
        <path
          d={wavePath}
          fill="white"
        />
      </svg>
    </motion.div>
  )
}
