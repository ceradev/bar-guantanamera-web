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
    madeToOrder,
    onAdd,
    onIncrease,
    onDecrease,
    onRemove,
}: {
    item: MenuItem
    inCart?: CartItem
    isOpenNow: boolean
    inactive?: boolean
    madeToOrder?: boolean
    onAdd: () => void
    onIncrease: () => void
    onDecrease: () => void
    onRemove: () => void
}) {
    const isDisabled = inactive || madeToOrder
    return (
        <div className="rounded-xl border border-border bg-card shadow-sm p-5">
            <div className="relative h-40 rounded-lg overflow-hidden bg-secondary">
                <Image
                    src={(item as any).image || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex items-start justify-between mt-4">
                <div className="pr-4">
                    <div className="text-foreground font-semibold text-base">{item.name}</div>
                    {item.description && (
                        <div className="text-sm text-muted-foreground font-body mt-1 line-clamp-2">{item.description}</div>
                    )}
                </div>
                <div className="text-primary font-bold text-base flex-shrink-0">{item.price}</div>
            </div>
            <div className="mt-4">
                {!inCart ? (
                    <Button
                        onClick={onAdd}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm w-full py-3 text-sm font-semibold tracking-wide disabled:opacity-60"
                        disabled={!isOpenNow || isDisabled}
                    >
                        {inactive ? "No disponible" : madeToOrder ? "Solo por encargo" : "+ Anadir"}
                    </Button>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="rounded-sm h-9 w-9 border-border" onClick={onDecrease}>
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="w-10 text-center font-semibold text-base text-foreground">{inCart.quantity}</div>
                          <Button variant="outline" size="icon" className="rounded-sm h-9 w-9 border-border" onClick={onIncrease} disabled={isDisabled}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="icon" className="rounded-sm h-9 w-9 border-border" onClick={onRemove}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
