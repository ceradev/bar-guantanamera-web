"use client"

import { Button } from "@/components/ui/button"
import CartItemRowComp from "@/components/features/encargar/cart-item-row"
import { formatPrice } from "@/lib/pricing"
import type { CartItem } from "@/types/order"

export default function DesktopCartPanel({
  items,
  total,
  bagFee = 0,
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
  bagFee?: number
  pickupTime: string
  isOpenNow: boolean
  inactiveNames?: string[]
  onChooseHour: () => void
  onIncrease: (name: string) => void
  onDecrease: (name: string) => void
  onRemove: (name: string) => void
}) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-8 hidden md:block">
      <h2 className="text-2xl font-bold text-foreground mb-4">TOTAL DEL PEDIDO</h2>
      <div>
        {items.length === 0 ? (
          <div className="text-base text-muted-foreground font-body">{"Anade productos para ver tu pedido."}</div>
        ) : (
          <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2">
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
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground font-body">Subtotal</div>
                <div className="text-sm font-semibold text-foreground">{formatPrice(total - bagFee)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground font-body">Bolsa</div>
                <div className="text-sm font-semibold text-foreground">{formatPrice(bagFee)}</div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-base font-bold text-foreground">TOTAL</div>
                <div className="text-2xl font-bold text-primary">{formatPrice(total)}</div>
              </div>
            </div>
            {pickupTime && (
              <div className="text-sm text-foreground font-body">
                Hora seleccionada: <span className="font-semibold">{pickupTime}</span>
              </div>
            )}
            {!pickupTime && (
              <div className="rounded-lg bg-secondary border border-border text-muted-foreground text-sm font-body px-3 py-2">
                Selecciona una hora para seguir con tu pedido
              </div>
            )}
            <Button
              onClick={onChooseHour}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm py-3 text-base font-semibold tracking-wide disabled:opacity-60"
              disabled={items.length === 0 || !isOpenNow}
            >
              ELEGIR HORA
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
