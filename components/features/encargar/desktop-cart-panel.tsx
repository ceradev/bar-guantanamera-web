"use client"

import { Button } from "@/components/ui/button"
import CartItemRowComp from "@/components/features/encargar/cart-item-row"
import { formatPrice } from "@/lib/pricing"
import type { CartItem } from "@/types/order"

export default function DesktopCartPanel({
  items,
  total,
  pickupTime,
  isOpenNow,
  inactiveNames,
  onChooseHour,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  items: CartItem[]
  total: number
  pickupTime: string
  isOpenNow: boolean
  inactiveNames?: string[]
  onChooseHour: () => void
  onIncrease: (name: string) => void
  onDecrease: (name: string) => void
  onRemove: (name: string) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hidden md:block">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrito</h2>
      <div>
        {items.length === 0 ? (
          <div className="text-base text-gray-500">Añade productos para ver tu pedido.</div>
        ) : (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {items.map((it) => (
              <CartItemRowComp
                key={it.name}
                item={it}
                inactive={inactiveNames?.includes(it.name)}
                onDecrease={() => onDecrease(it.name)}
                onIncrease={() => onIncrease(it.name)}
                onRemove={() => onRemove(it.name)}
              />
            ))}
            <div className="flex items-center justify-between pt-2">
              <div className="text-base text-gray-600">Total</div>
              <div className="text-2xl font-bold text-gray-900">{formatPrice(total)}</div>
            </div>
            {pickupTime && (
              <div className="text-sm text-gray-700">
                Hora seleccionada: <span className="font-semibold">{pickupTime}</span>
              </div>
            )}
            {!pickupTime && (
              <div className="rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-3 py-2">
                Selecciona una hora para continuar con tu pedido.
              </div>
            )}
            <Button
              onClick={onChooseHour}
              className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full py-3 text-base disabled:opacity-60"
              disabled={items.length === 0 || !isOpenNow}
            >
              Elegir hora
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

