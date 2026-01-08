"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
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
    <div className={`flex items-start justify-between ${mobile ? "gap-3 pb-3" : "gap-4 pb-4"} border-b border-gray-100`}>
      <div className="flex-1 min-w-0">
        <div className={`${mobile ? "text-sm" : "text-base"} text-gray-900 font-semibold`} title={item.name}>
          {item.name}
        </div>
        <div className={`${mobile ? "text-xs" : "text-sm"} text-gray-500`}>{formatPrice(item.unitPrice)} c/u</div>
        <div className="mt-2 flex items-center gap-2">
          <Button variant="outline" size="icon" className={`${mobile ? "h-8 w-8" : "h-9 w-9"} rounded-full`} onClick={onDecrease}>
            <Minus className="w-4 h-4" />
          </Button>
          <div className={`${mobile ? "w-8" : "w-10"} text-center font-semibold ${mobile ? "text-sm" : "text-base"}`}>{item.quantity}</div>
          <Button variant="outline" size="icon" className={`${mobile ? "h-8 w-8" : "h-9 w-9"} rounded-full`} onClick={onIncrease} disabled={!!inactive}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className={`${mobile ? "h-8 w-8" : "h-9 w-9"} rounded-full`} onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className={`${mobile ? "w-20" : "w-24"} text-right font-bold text-red-600 ${mobile ? "text-sm" : "text-base"} flex-shrink-0`}>
        {formatPrice(item.unitPrice * item.quantity)}
      </div>
    </div>
  )
}
