"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { MenuItem } from "@/types/menu"
import type { CartItem } from "@/types/order"

export default function ProductCard({
    item,
    inCart,
    isOpenNow,
    inactive,
    onAdd,
    onIncrease,
    onDecrease,
    onRemove,
}: {
    item: MenuItem
    inCart?: CartItem
    isOpenNow: boolean
    inactive?: boolean
    onAdd: () => void
    onIncrease: () => void
    onDecrease: () => void
    onRemove: () => void
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
            <div className="relative h-40 rounded-xl overflow-hidden bg-gray-50">
                <Image
                    src={(item as any).image || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex items-start justify-between mt-4">
                <div className="pr-4">
                    <div className="text-gray-900 font-semibold text-lg">{item.name}</div>
                    {item.description && (
                        <div className="text-base text-gray-500 mt-2">{item.description}</div>
                    )}
                </div>
                <div className="text-red-600 font-bold text-lg">{item.price}</div>
            </div>
            <div className="mt-4">
                {!inCart ? (
                    <Button
                        onClick={onAdd}
                        className="bg-red-600 text-white hover:bg-red-700 rounded-full w-full py-3 text-base disabled:opacity-60"
                        disabled={!isOpenNow || !!inactive}
                    >
                        {inactive ? "No disponible" : "+ Añadir"}
                    </Button>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={onDecrease}>
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="w-12 text-center font-semibold text-md">{inCart.quantity}</div>
                          <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={onIncrease} disabled={!!inactive}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={onRemove}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

