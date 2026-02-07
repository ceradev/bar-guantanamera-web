"use client"

import Image from "next/image"
import Link from "next/link"
import menuData from "@/data/menu.json"

interface MenuItem {
  name: string
  description: string
  price: string
  image: string
  popular?: boolean
  iconic?: boolean
}

function getPopularItems(): MenuItem[] {
  const allItems: MenuItem[] = []
  const categories = menuData.menuCategories as Record<string, { items: MenuItem[] }>
  Object.values(categories).forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.popular) allItems.push(item)
    })
  })
  return allItems.slice(0, 4)
}

export default function PopularDishes() {
  const popular = getPopularItems()

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            FAVORITOS DE LOS CLIENTES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Opciones Populares
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {popular.map((item) => (
            <Link
              key={item.name}
              href="/menu"
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-secondary">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-bold text-foreground text-sm md:text-base mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed mb-2 line-clamp-2 px-2">
                {item.description.length > 60
                  ? item.description.substring(0, 60) + "..."
                  : item.description}
              </p>
              <p className="text-base font-bold text-foreground">{item.price}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
          >
            VER EL MENU COMPLETO
          </Link>
        </div>
      </div>
    </section>
  )
}
