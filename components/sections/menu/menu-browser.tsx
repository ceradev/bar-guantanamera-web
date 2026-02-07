"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Grid3X3, List, Eye, Heart, ShoppingCart, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import menuData from "@/data/menu.json"

interface MenuItem {
  name: string
  description: string
  price: string
  image?: string
  popular?: boolean
  iconic?: boolean
  category?: string
  spicy?: boolean
}

interface MenuCategory {
  title: string
  subtitle: string
  items: MenuItem[]
}

// Flatten all items for search/filter
function getAllItems(): MenuItem[] {
  const items: MenuItem[] = []
  const categories = menuData.menuCategories as Record<string, MenuCategory>
  Object.entries(categories).forEach(([, cat]) => {
    cat.items.forEach((item) => {
      items.push({ ...item, category: cat.title })
    })
  })
  // Add combos
  menuData.comboMeals.forEach((combo) => {
    items.push({
      name: combo.name,
      description: combo.description,
      price: combo.price,
      category: "Ofertas",
      popular: true,
    })
  })
  return items
}

const categoryLabels = [
  { key: "all", label: "Ofertas" },
  { key: "pollos", label: "Pollos asados" },
  { key: "costillasYPatas", label: "Costillas y Patas Asadas" },
  { key: "guarniciones", label: "Guarniciones" },
  { key: "quesadillasYBurritos", label: "Quesadillas y Burritos" },
  { key: "bebidas", label: "Bebidas" },
  { key: "mojos", label: "Mojos" },
]

const popularTags = ["Asado", "Combos"]

const ITEMS_PER_PAGE = 9

export default function MenuBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const allItems = useMemo(() => getAllItems(), [])

  const filteredItems = useMemo(() => {
    let items = allItems

    // Category filter
    if (activeCategory !== "all") {
      const catData = menuData.menuCategories as Record<string, MenuCategory>
      const cat = catData[activeCategory]
      if (cat) {
        items = cat.items.map((item) => ({ ...item, category: cat.title }))
      } else if (activeCategory === "bebidas") {
        items = menuData.bebidas.map((b) => ({ ...b, category: "Bebidas" }))
      } else if (activeCategory === "mojos") {
        items = menuData.mojos.map((m) => ({ ...m, category: "Mojos" }))
      }
    }

    // Tag filter
    if (activeTag === "Combos") {
      items = menuData.comboMeals.map((c) => ({
        name: c.name,
        description: c.description,
        price: c.price,
        category: "Ofertas",
      }))
    } else if (activeTag === "Asado") {
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes("asad") ||
          i.description.toLowerCase().includes("asad")
      )
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      )
    }

    return items
  }, [allItems, activeCategory, activeTag, searchQuery])

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key)
    setActiveTag(null)
    setCurrentPage(1)
  }

  const handleTagChange = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag)
    setActiveCategory("all")
    setCurrentPage(1)
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Search + Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
          <div className="relative flex-shrink-0 w-full md:w-72">
            <input
              type="text"
              placeholder="Buscando el producto..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-4 pr-12 py-3 border border-border rounded-lg bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          </div>

          <div className="flex items-center justify-between flex-1 gap-4">
            <p className="text-sm text-muted-foreground font-body whitespace-nowrap">
              Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} de{" "}
              {filteredItems.length} resultados
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-body hidden md:inline">
                Orden por defecto
              </span>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded border transition-colors",
                  viewMode === "grid"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                )}
                aria-label="Vista en cuadricula"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded border transition-colors",
                  viewMode === "list"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                )}
                aria-label="Vista en lista"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                {"Categorias"}
              </h3>
              <nav className="flex flex-col gap-1">
                {categoryLabels.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={cn(
                      "text-left px-3 py-2 text-sm font-body rounded-md transition-colors flex items-center gap-2",
                      activeCategory === cat.key
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ArrowRight className="h-3 w-3 flex-shrink-0" />
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Popular Tags */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Etiquetas Populares
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={cn(
                      "px-4 py-1.5 text-sm rounded-sm border transition-colors",
                      activeTag === tag
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Links */}
            <div className="border border-border rounded-xl p-5">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Pide a Domicilio
              </h3>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-semibold text-sm text-foreground">Uber Eats</p>
                  <p className="text-xs text-muted-foreground font-body">
                    {"25-35 min  ·  Envio 2.99\u20AC"}
                  </p>
                  <a
                    href="https://www.ubereats.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 text-sm font-semibold bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
                  >
                    Pedir en Uber Eats
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-sm text-foreground">Glovo</p>
                  <p className="text-xs text-muted-foreground font-body">
                    {"20-30 min  ·  Envio 1.99\u20AC"}
                  </p>
                  <a
                    href="https://glovoapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Pedir en Glovo
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {paginatedItems.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground font-body">
                  No se encontraron productos.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map((item, index) => (
                  <ProductCard key={`${item.name}-${index}`} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {paginatedItems.map((item, index) => (
                  <ProductListItem key={`${item.name}-${index}`} item={item} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Pagina anterior"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "h-9 w-9 rounded-full text-sm font-semibold transition-colors",
                      currentPage === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="h-9 w-9 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Pagina siguiente"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden group">
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="h-8 w-8 opacity-30" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-sm mb-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3 line-clamp-2">
          {item.description || "Producto del menu"}
        </p>
        <p className="text-base font-bold text-foreground italic mb-3">
          {item.price}
        </p>
        <div className="flex items-center justify-between">
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold rounded-sm"
          >
            <Link href="/encargar">
              <ShoppingCart className="mr-1.5 h-3 w-3" />
              {"Anadir al carrito"}
            </Link>
          </Button>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors" aria-label="Ver detalles">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors" aria-label="Favorito">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductListItem({ item }: { item: MenuItem }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden flex gap-4 p-4 group">
      <div className="relative w-24 h-24 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="h-5 w-5 opacity-30" />
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-foreground text-sm mb-1">{item.name}</h3>
          <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">
            {item.description || "Producto del menu"}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-base font-bold text-foreground italic">{item.price}</p>
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold rounded-sm"
          >
            <Link href="/encargar">
              <ShoppingCart className="mr-1.5 h-3 w-3" />
              {"Anadir al carrito"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
