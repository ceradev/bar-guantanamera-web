import { Button } from "@/components/ui/button"

interface CheckoutSummaryProps {
    total: number
    bagFee: number
    finalTotal: number
    canOrder: boolean
    hasItems: boolean
    slots: string[]
    pickupTime: string | null
    setPickupTime: (time: string) => void
    customerData: {
        name: string
        email: string
        phone: string
    }
    setCustomerData: {
        setName: (name: string) => void
        setEmail: (email: string) => void
        setPhone: (phone: string) => void
    }
    errors: string[]
    onSubmit: () => void
}

export function CheckoutSummary({
    total,
    bagFee,
    finalTotal,
    canOrder,
    hasItems,
    slots,
    pickupTime,
    setPickupTime,
    customerData,
    setCustomerData,
    errors,
    onSubmit,
}: CheckoutSummaryProps) {
    const { name, email, phone } = customerData
    const { setName, setEmail, setPhone } = setCustomerData

    return (
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h3 className="text-base font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border pb-4">
                Resumen del Pedido
            </h3>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bolsa</span>
                    <span className="font-medium">{bagFee.toFixed(2)}€</span>
                </div>
                <div className="pt-4 mt-2 border-t border-border flex justify-between items-center">
                    <span className="font-bold text-base">TOTAL</span>
                    <span className="font-bold text-xl text-primary">{finalTotal.toFixed(2)}€</span>
                </div>
            </div>

            {hasItems && canOrder && (
                <div className="space-y-6 pt-4 border-t border-border">
                    {/* 1. Time Selection */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                            Hora de recogida
                        </h4>
                        <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2">
                            {slots.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setPickupTime(s)}
                                    className={`px-2 py-2 text-sm rounded-md border transition-all ${pickupTime === s
                                        ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                                        : "border-border hover:bg-secondary text-foreground"}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        {!pickupTime && (
                            <p className="text-xs text-muted-foreground">Selecciona una hora disponible.</p>
                        )}
                    </div>

                    {/* 2. Client Details */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                            Tus Datos
                        </h4>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Tu Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-sm px-3 py-2 border border-border rounded-md bg-transparent focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Tu Email (para confirmación)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-sm px-3 py-2 border border-border rounded-md bg-transparent focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            />
                            <div>
                                <input
                                    type="tel"
                                    placeholder={total > 30 ? "Teléfono móvil" : "Teléfono (Solo pedidos > 30€)"}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={total <= 30}
                                    className={`w-full text-sm px-3 py-2 border border-border rounded-md bg-transparent focus:ring-1 focus:ring-primary focus:border-primary outline-none ${total <= 30 ? "opacity-50 cursor-not-allowed bg-muted" : ""}`}
                                />
                                {total > 30 && (
                                    <p className="text-[10px] text-muted-foreground mt-1">* Requerido para pedidos grandes</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Errors */}
                    {errors.length > 0 && (
                        <div className="text-xs text-destructive bg-destructive/5 p-3 rounded-md font-medium">
                            {errors.map((e, i) => <div key={i}>{e}</div>)}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        className="w-full bg-primary text-primary-foreground font-bold py-6 text-base tracking-wide hover:bg-primary/90 shadow-md transition-all uppercase"
                        disabled={!pickupTime || !name || (total > 30 && !phone)}
                        onClick={onSubmit}
                    >
                        Encargar Ahora
                    </Button>
                </div>
            )}

            {(!canOrder || !hasItems) && (
                <div className="bg-secondary/50 p-4 rounded-lg text-center text-sm text-muted-foreground mt-4">
                    {!hasItems ? "Añade productos para continuar" : "Pedidos no disponibles en este momento"}
                </div>
            )}
        </div>
    )
}
