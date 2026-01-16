import React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/pricing"
import CartItemRowComp from "./cart-item-row"
import StepContentComp from "./step-content"

interface MobileCartBarProps {
    canOrder: boolean
    mobileCartOpen: boolean
    setMobileCartOpen: (open: boolean) => void
    finalTotal: number
    pickupTime: string
    setPickupTime: (time: string) => void
    cart: any
    inactiveNames: string[]
    total: number
    bagFee: number
    step: any
    setStep: (step: any) => void
    slots: any
    name: string
    setName: (name: string) => void
    phone: string
    setPhone: (phone: string) => void
    errors: string[]
    submit: () => Promise<void>
    increase: (name: string) => void
    decrease: (name: string) => void
    removeItem: (name: string) => void
}

export default function MobileCartBar({
    canOrder,
    mobileCartOpen,
    setMobileCartOpen,
    finalTotal,
    pickupTime,
    cart,
    inactiveNames,
    total,
    bagFee,
    step,
    setStep,
    slots,
    name,
    setName,
    phone,
    setPhone,
    errors,
    submit,
    setPickupTime,
    increase,
    decrease,
    removeItem
}: MobileCartBarProps) {
    if (!canOrder) return null

    const cartItems = Object.values(cart) as any[]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 md:hidden">
            <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">Ver pedido</div>
                <div className="text-lg font-bold text-red-600">{formatPrice(finalTotal)}</div>
            </div>
            <div className="mt-2">
                <Sheet open={mobileCartOpen} onOpenChange={setMobileCartOpen}>
                    <SheetTrigger asChild>
                        <Button className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full">Abrir carrito</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-4 pb-0">
                        <SheetHeader className="pb-2">
                            <SheetTitle>Tu pedido</SheetTitle>
                            <div className="text-xs text-gray-600 mt-1">
                                Hora seleccionada: <span className="font-semibold">{pickupTime || "Sin seleccionar"}</span>
                            </div>
                        </SheetHeader>
                        <div className="mt-2 space-y-4 overflow-y-auto overflow-x-hidden h-[calc(85vh-100px)] pb-12 pr-1">
                            {cartItems.map((it: any) => (
                                <CartItemRowComp
                                    key={it.name}
                                    item={it}
                                    mobile
                                    inactive={inactiveNames.includes(it.name)}
                                    onDecrease={() => decrease(it.name)}
                                    onIncrease={() => increase(it.name)}
                                    onRemove={() => removeItem(it.name)}
                                />
                            ))}
                            <div className="space-y-1 pt-2">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">Subtotal</div>
                                    <div className="text-sm font-semibold text-gray-900">{formatPrice(total)}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">Bolsa</div>
                                    <div className="text-sm font-semibold text-gray-900">{formatPrice(bagFee)}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">Total</div>
                                    <div className="text-lg font-bold text-gray-900">{formatPrice(finalTotal)}</div>
                                </div>
                            </div>
                            {step === "productos" && (
                                <Button
                                    onClick={() => {
                                        setStep("hora")
                                    }}
                                    className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full"
                                    disabled={cartItems.length === 0}
                                >
                                    Elegir hora
                                </Button>
                            )}
                            <StepContentComp
                                variant="mobile"
                                step={step}
                                setStep={setStep}
                                slots={slots}
                                isOpenNow={canOrder}
                                pickupTime={pickupTime}
                                setPickupTime={setPickupTime}
                                name={name}
                                setName={setName}
                                phone={phone}
                                setPhone={setPhone}
                                errors={errors}
                                cartItems={cartItems}
                                total={finalTotal}
                                bagFee={bagFee}
                                submit={submit}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}
