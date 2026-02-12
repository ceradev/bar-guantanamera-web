
"use client"

import { useState, useEffect } from "react"

export function useScroll(threshold = 10) {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll() // Check initial scroll position

        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return isScrolled
}
