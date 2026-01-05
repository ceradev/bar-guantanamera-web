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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm md:p-6 p-3">
      <h3 className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wider mb-3">Categorías</h3>
      <div className="flex overflow-x-auto gap-2 md:gap-3 pb-2 snap-x snap-mandatory">
        {entries.map(([key, category]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-left transition-colors text-sm md:text-[0.95rem] font-semibold min-w-[120px] md:min-w-[140px] border snap-start ${
              activeKey === key ? "bg-red-50 text-red-600 border-red-600" : "hover:bg-gray-50 text-gray-800 border-gray-200/60"
            }`}
          >
            <span className="font-semibold">{category.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

