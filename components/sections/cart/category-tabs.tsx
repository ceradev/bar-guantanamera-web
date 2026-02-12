"use client"

import { useMemo } from "react"

export type CategoryInfo = { title: string; subtitle?: string }

export default function CategoryTabs({
  categories,
  activeKey,
  onSelect,
}: {
  categories: Record<string, CategoryInfo>
  activeKey: string | null
  onSelect: (key: string) => void
}) {
  const entries = useMemo(() => Object.entries(categories), [categories])
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm md:p-6 p-3">
      <h3 className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider mb-3">{"Categorias"}</h3>
      <div className="flex overflow-x-auto gap-2 md:gap-3 pb-2 snap-x snap-mandatory">
        {entries.map(([key, category]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-left transition-colors text-sm md:text-[0.95rem] font-semibold min-w-[120px] md:min-w-[140px] border snap-start ${
              activeKey === key ? "bg-primary/5 text-primary border-primary" : "hover:bg-secondary text-foreground border-border"
            }`}
          >
            <span className="font-semibold">{category.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
