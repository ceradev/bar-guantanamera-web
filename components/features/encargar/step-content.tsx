"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, User, Phone } from "lucide-react"
import type { CartItem, OrderStep } from "@/types/order"
import { formatPrice } from "@/lib/pricing"

export default function StepContent({
  variant,
  step,
  setStep,
  slots,
  isOpenNow,
  pickupTime,
  setPickupTime,
  name,
  setName,
  phone,
  setPhone,
  errors,
  cartItems,
  total,
  bagFee,
  submit,
}: {
  variant: "desktop" | "mobile"
  step: OrderStep
  setStep: (s: OrderStep) => void
  slots: string[]
  isOpenNow: boolean
  pickupTime: string
  setPickupTime: (t: string) => void
  name: string
  setName: (n: string) => void
  phone: string
  setPhone: (p: string) => void
  errors: string[]
  cartItems: CartItem[]
  total: number
  bagFee: number
  submit: () => void
}) {
  const isMobile = variant === "mobile"
  useEffect(() => {
    if (cartItems.length === 0 && step !== "productos") {
      setPickupTime("")
      setStep("productos")
    }
  }, [cartItems.length, step, setStep, setPickupTime])

  if (step === "hora") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-1">
          <Clock className={`${isMobile ? "w-5 h-5" : "w-5 h-5"} text-muted-foreground`} />
          <h3 className={`${isMobile ? "text-base" : "text-xl"} font-semibold text-foreground`}>Selecciona la hora de recogida</h3>
        </div>
        <div className={`${isMobile ? "max-h-[35vh]" : "max-h-[45vh]"} overflow-y-auto pr-1`}>
          <div className={`grid ${isMobile ? "grid-cols-3 gap-2" : "grid-cols-3 gap-3"}`}>
            {slots.map(s => (
              <button
                key={s}
                onClick={() => setPickupTime(s)}
                className={`${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-base"} rounded-lg border disabled:opacity-60 ${pickupTime === s ? "border-primary text-primary bg-primary/5" : "border-border text-foreground hover:bg-secondary"}`}
                disabled={!isOpenNow}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <Button
          onClick={() => setStep("cliente")}
          className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm ${isMobile ? "" : "py-3 text-base"} disabled:opacity-60`}
          disabled={!pickupTime || !isOpenNow}
        >
          Continuar
        </Button>
      </div>
    )
  }

  if (step === "cliente") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className={`${isMobile ? "text-sm" : "text-base"} text-foreground`}>Nombre de la persona que recoge el pedido</div>
          <div className="flex items-center gap-2">
            <User className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-muted-foreground`} />
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Introduce el nombre"
              className={`w-full rounded-lg border border-border bg-background ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-3 text-base"} text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className={`${isMobile ? "text-sm" : "text-base"} text-foreground`}>{"Telefono"}</div>
            <div className={`${isMobile ? "text-xs" : "text-sm"} text-primary`}>{"Solo se requiere si el total supera 30\u20AC"}</div>
          </div>
          <div className="flex items-center gap-1">
            <Phone className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-muted-foreground`} />
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="tel"
              disabled={total <= 30}
              placeholder={"Introduce el telefono movil"}
              className={`w-full rounded-lg border border-border bg-background ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-3 text-base"} text-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary`}
            />
          </div>
          {total > 30 && !phone.trim() && (
            <div className={`text-xs text-primary mt-1 font-body`}>{"Para pedidos grandes necesitamos un telefono por si surge algun problema."}</div>
          )}
        </div>
        {errors.length > 0 && (
          <div className={`${isMobile ? "text-xs" : "text-sm"} rounded-lg bg-destructive/5 text-destructive px-3 py-2 font-body`}>{errors.join(" ")}</div>
        )}
        <Button
          onClick={() => setStep("confirmacion")}
          className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm disabled:opacity-60`}
          disabled={
            cartItems.length === 0 ||
            !pickupTime ||
            !name.trim() ||
            (total > 30 && !phone.trim()) ||
            !isOpenNow
          }
        >
          Revisar pedido
        </Button>
      </div>
    )
  }

  if (step === "confirmacion") {
    return (
      <div className="space-y-4">
        <div className={`${isMobile ? "text-base" : "text-xl"} font-semibold text-foreground`}>{"Confirmacion"}</div>
        {errors.length > 0 && (
          <div className={`${isMobile ? "text-xs" : "text-sm"} rounded-lg bg-destructive/5 text-destructive px-3 py-2 font-body`}>{errors.join(" ")}</div>
        )}
        <div className={`rounded-xl border border-border p-4 space-y-2 ${isMobile ? "max-h-[40vh] overflow-y-auto pr-1" : ""}`}>
          <div className="text-sm text-muted-foreground font-body">Nombre: <span className="font-semibold text-foreground">{name}</span></div>
          <div className="text-sm text-muted-foreground font-body">{"Telefono: "}<span className="font-semibold text-foreground">{phone || "\u2014"}</span></div>
          <div className="text-sm text-muted-foreground font-body">Hora de recogida: <span className="font-semibold text-foreground">{pickupTime || "Sin seleccionar"}</span></div>
          <div className="text-sm text-muted-foreground font-body">Productos:</div>
          <div className="space-y-2">
            {cartItems.map(it => (
              <div key={it.name} className="flex items-center justify-between text-sm">
                <div className="truncate text-foreground font-body">{it.name} {"\u00D7"} {it.quantity}</div>
                <div className="font-semibold text-foreground">{formatPrice(it.unitPrice * it.quantity)}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1 pt-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground font-body">Subtotal</div>
              <div className="text-sm font-semibold text-foreground">{formatPrice(total - bagFee)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground font-body">Bolsa</div>
              <div className="text-sm font-semibold text-foreground">{formatPrice(bagFee)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-base text-muted-foreground font-body">Total</div>
              <div className="text-lg font-bold text-foreground">{formatPrice(total)}</div>
            </div>
          </div>
        </div>
        <div className={`flex ${isMobile ? "flex-col gap-3" : "items-center gap-1"}`}>
          {isMobile ? (
            <>
              <Button
                onClick={submit}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm py-6 text-lg font-bold"
              >
                Encargar pedido
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 rounded-sm text-sm py-5 border-border" onClick={() => setStep("cliente")}>Editar datos</Button>
                <Button variant="outline" className="flex-1 rounded-sm text-sm py-5 border-border" onClick={() => setStep("hora")}>Editar hora</Button>
              </div>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="rounded-sm border-border" onClick={() => setStep("cliente")}>Editar datos</Button>
              <Button variant="outline" size="sm" className="rounded-sm border-border" onClick={() => setStep("hora")}>Editar hora</Button>
              <Button
                onClick={submit}
                size="sm"
                className={`flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm disabled:opacity-60`}
              >
                Encargar pedido
              </Button>
            </>
          )}
        </div>
      </div>
    )
  }

  return null
}
