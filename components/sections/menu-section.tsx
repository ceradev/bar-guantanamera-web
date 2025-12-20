"use client"

import { useState, useMemo, useRef } from "react"
import { motion, useInView } from "framer-motion"

import menuData from "@/data/menu-data.json"
import type { MenuData, MenuItem } from "@/types/menu"

import { MenuHeader } from "./menu/menu-header"
import { IconicDishes } from "./menu/iconic-dishes"
import { CategoryGrid } from "./menu/category-grid"
import { CategoryDetail } from "./menu/category-detail"
import { ComboMealsSection } from "./menu/combo-meals-section"
import { MojosSection } from "./menu/mojos-section"
import { DrinksSection } from "./menu/drinks-section"
import { staggerContainer } from "./menu/animations"

// Types & Data
const { menuCategories, comboMeals, bebidas, mojos } = menuData as MenuData

// --- Main Component ---

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const level3Ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(menuRef, { once: true, margin: "-100px" })

  // Filter Iconic Items (Level 1)
  const iconicItems = useMemo(() => {
    const allItems: MenuItem[] = []
    Object.values(menuCategories).forEach((category) => {
      category.items.forEach((item) => {
        allItems.push(item)
      })
    })

    const targetNames = [
      "pollo asado entero con papas",
      "pollo asado entero con papas familiar",
      "croquetas de pollo",
      "costillar entero",
      "quesadilla de pollo con refresco",
      "pata asada"
    ]

    return targetNames
      .map(name => allItems.find(item => item.name.toLowerCase().trim() === name))
      .filter((item): item is MenuItem => item !== undefined)
  }, [])

  const handleCategoryClick = (categoryKey: string) => {
    setActiveCategory(categoryKey)
    // Small delay to allow render before scrolling
    setTimeout(() => {
      level3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const closeCategory = () => {
    setActiveCategory(null)
    // Scroll back to categories
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="menu" ref={menuRef} className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <MenuHeader />

          <IconicDishes items={iconicItems} />

          <CategoryGrid
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />

          <div ref={level3Ref} className="mb-20">
            <CategoryDetail
              activeCategory={activeCategory}
              onClose={closeCategory}
            />
          </div>

          <ComboMealsSection combos={comboMeals} />

          <div className="flex flex-col gap-10 w-full mb-20">
            <div className="w-full">
              <MojosSection items={mojos} />
            </div>
            <div className="w-full">
              <DrinksSection beverages={bebidas} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
