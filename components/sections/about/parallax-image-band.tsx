"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxImageBandProps {
    src: string
    alt: string
    imagePosition?: string
}

export default function ParallaxImageBand({
    src,
    alt,
    imagePosition = "object-center"
}: ParallaxImageBandProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // The image moves from -20% to +20% as you scroll through the section
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[500px] md:h-[600px] overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 w-full h-[140%] -top-[20%]"
                style={{ y }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={cn("object-cover", imagePosition)}
                    sizes="100vw"
                    priority
                />
            </motion.div>
        </section>
    )
}
