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
          <Clock className={`${isMobile ? "w-5 h-5" : "w-5 h-5"} text-gray-500`} />
          <h3 className={`${isMobile ? "text-base" : "text-xl"} font-semibold text-gray-900`}>Selecciona la hora de recogida</h3>
        </div>
        <div className={`${isMobile ? "max-h-[32vh]" : "max-h-[45vh]"} overflow-y-auto pr-1`}>
          <div className={`grid ${isMobile ? "grid-cols-3 gap-2" : "grid-cols-3 gap-3"}`}>
          {slots.map(s => (
            <button
              key={s}
              onClick={() => setPickupTime(s)}
              className={`${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-base"} rounded-lg border disabled:opacity-60 ${pickupTime === s ? "border-red-600 text-red-600 bg-red-50" : "border-gray-200 text-gray-800 hover:bg-gray-50"}`}
              disabled={!isOpenNow}
            >
              {s}
            </button>
          ))}
          </div>
        </div>
        <Button
          onClick={() => setStep("cliente")}
          className={`w-full bg-red-600 text-white hover:bg-red-700 rounded-full ${isMobile ? "" : "py-3 text-base"} disabled:opacity-60`}
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
          <div className={`${isMobile ? "text-sm" : "text-base"} text-gray-700`}>Nombre de la persona que recoge el pedido</div>
          <div className="flex items-center gap-2">
            <User className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-gray-500`} />
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nombre de la persona que recoge el pedido"
              className={`w-full rounded-lg border border-gray-300 bg-white ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-3 text-base"} focus:outline-none focus:ring-2 focus:ring-red-600`}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className={`${isMobile ? "text-sm" : "text-base"} text-gray-700`}>Teléfono</div>
            <div className={`${isMobile ? "text-xs" : "text-sm"} text-red-500`}>Obligatorio si el total supera 30€</div>
          </div>
          <div className="flex items-center gap-1">
            <Phone className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-gray-500`} />
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="tel"
              disabled={total <= 30}
              placeholder="Teléfono de contacto"
              className={`w-full rounded-lg border border-gray-300 bg-white ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-3 text-base"} focus:outline-none focus:ring-2 focus:ring-red-600`}
            />
          </div>
          {total > 30 && !phone.trim() && (
            <div className={`${isMobile ? "text-xs" : "text-xs"} text-red-600 mt-1`}>Para pedidos grandes necesitamos un teléfono por si surge algún problema.</div>
          )}
        </div>
        {errors.length > 0 && (
          <div className={`${isMobile ? "text-xs" : "text-sm"} rounded-lg bg-red-50 text-red-700 px-3 py-2`}>{errors.join(" ")}</div>
        )}
        <Button
          onClick={() => setStep("confirmacion")}
          className={`w-full bg-red-600 text-white hover:bg-red-700 rounded-full disabled:opacity-60 ${isMobile ? "" : ""}`}
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
        <div className={`${isMobile ? "text-base" : "text-xl"} font-semibold text-gray-900`}>Confirmación</div>
        {errors.length > 0 && (
          <div className={`${isMobile ? "text-xs" : "text-sm"} rounded-lg bg-red-50 text-red-700 px-3 py-2`}>{errors.join(" ")}</div>
        )}
        <div className={`rounded-xl border border-gray-200 p-4 space-y-2 ${isMobile ? "max-h-[40vh] overflow-y-auto pr-1" : ""}`}>
          <div className="text-sm text-gray-700">Nombre: <span className="font-semibold">{name}</span></div>
          <div className="text-sm text-gray-700">Teléfono: <span className="font-semibold">{phone || "—"}</span></div>
          <div className="text-sm text-gray-700">Hora de recogida: <span className="font-semibold">{pickupTime || "Sin seleccionar"}</span></div>
          <div className="text-sm text-gray-700">Productos:</div>
          <div className="space-y-2">
            {cartItems.map(it => (
              <div key={it.name} className="flex items-center justify-between text-sm">
                <div className="truncate">{it.name} × {it.quantity}</div>
                <div className="font-semibold">{formatPrice(it.unitPrice * it.quantity)}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="text-md text-gray-600">Total</div>
            <div className="text-lg font-bold text-gray-900">{formatPrice(total)}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => setStep("cliente")}>Editar datos</Button>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => setStep("hora")}>Editar hora</Button>
          <Button
            onClick={submit}
            size="sm"
            className={`flex-1 bg-red-600 text-white hover:bg-red-700 rounded-full disabled:opacity-60`}
          >
            Encargar pedido
          </Button>
        </div>
      </div>
    )
  }

  return null
}
