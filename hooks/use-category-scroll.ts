"use client"

import { useEffect, useState } from "react"

export function useCategoryScroll(productsRef: React.RefObject<HTMLDivElement>, sectionKeys: string[]) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const el = productsRef.current
    const style = el ? getComputedStyle(el) : null
    const root = style && style.overflowY !== "visible" ? el : null
    const obs = new IntersectionObserver((entries) => {
      let best: IntersectionObserverEntry | null = null
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
      })
      if (best) {
        const id = (best.target as Element).id.replace("cat-", "")
        setActiveCategory(id)
      }
    }, { root, threshold: [0.3, 0.6, 0.9], rootMargin: "0px 0px -40% 0px" })
    sectionKeys.forEach(key => {
      const el = document.getElementById(`cat-${key}`)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [productsRef, sectionKeys])

  const scrollToCategory = (key: string) => {
    setActiveCategory(key)
    const el = document.getElementById(`cat-${key}`)
    if (!el) return
    const rootEl = productsRef.current
    const useInnerScroll = rootEl ? getComputedStyle(rootEl).overflowY !== "visible" : false
    if (useInnerScroll && rootEl) {
      const top = el.offsetTop - 8
      rootEl.scrollTo({ top, behavior: "smooth" })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return { activeCategory, scrollToCategory }
}

