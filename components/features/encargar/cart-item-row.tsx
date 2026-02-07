"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import type { CartItem } from "@/types/order"
import { formatPrice } from "@/lib/pricing"

export default function CartItemRow({
  item,
  mobile,
  inactive,
  onDecrease,
  onIncrease,
  onRemove,
}: {
  item: CartItem
  mobile?: boolean
  inactive?: boolean
  onDecrease: () => void
  onIncrease: () => void
  onRemove: () => void
}) {
  return (
    <div className={`flex items-start justify-between ${mobile ? "gap-3 pb-3" : "gap-4 pb-4"} border-b border-border`}>
      <div className="flex-1 min-w-0">
        <div className={`${mobile ? "text-sm" : "text-base"} text-foreground font-semibold`} title={item.name}>
          {item.name}
        </div>
        <div className={`${mobile ? "text-xs" : "text-sm"} text-muted-foreground font-body`}>{formatPrice(item.unitPrice)} c/u</div>
        <div className="mt-2 flex items-center gap-2">
          <Button variant="outline" size="icon" className={`${mobile ? "h-7 w-7" : "h-8 w-8"} rounded-sm border-border`} onClick={onDecrease}>
            <Minus className="w-3 h-3" />
          </Button>
          <div className={`${mobile ? "w-7" : "w-8"} text-center font-semibold ${mobile ? "text-sm" : "text-base"} text-foreground`}>{item.quantity}</div>
          <Button variant="outline" size="icon" className={`${mobile ? "h-7 w-7" : "h-8 w-8"} rounded-sm border-border`} onClick={onIncrease} disabled={!!inactive}>
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className={`${mobile ? "w-16" : "w-20"} text-right font-bold text-primary ${mobile ? "text-sm" : "text-base"} flex-shrink-0`}>
          {formatPrice(item.unitPrice * item.quantity)}
        </div>
        <button
          onClick={onRemove}
          className="p-1 text-muted-foreground hover:text-primary transition-colors"
          aria-label={`Eliminar ${item.name}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
