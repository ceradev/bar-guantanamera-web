"use client"

import Image from "next/image"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import PageHero from "@/components/common/page-hero"
import InstagramSection from "@/components/sections/instagram-section"
import { useOrderPage } from "@/hooks/use-order-page"
import OrderSuccessDialog from "@/components/features/encargar/order-success-dialog"

import { Button } from "@/components/ui/button"
import { Trash2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/components/sections/menu/animations"

export default function PedirPage() {
    const {
        cart, name, setName, phone, setPhone, pickupTime, setPickupTime,
        errors,
        toastOpen, setToastOpen, toastMessage, lastOrder,
        isOpenNow, nextOpenText, slots, canOrder,
        total, bagFee, finalTotal,
        increase, decrease, removeItem, submit,
        inactiveNames, inactiveError
    } = useOrderPage()

    const cartItems = Object.values(cart)

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1">
                <PageHero
                    image="/images/cart/cart-hero.jpg"
                    imageAlt="Plato con pollo asado y ajo"
                    subtitle="Pidenos ahora"
                    titleWhite="ENCARGA"
                    titleRed="TU PEDIDO"
                    description="Elige tus platos, selecciona la hora de recogida y confirma tus datos. Pago y recogida en el local, facil y sencillo."
                />

                <section className="py-12 md:py-16 bg-background">
                    <div className="container mx-auto px-4 md:px-6 max-w-[95%]">

                        {!canOrder && (
                            <div className="mb-8 p-4 bg-secondary/50 border border-border rounded-lg text-center">
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    {!isOpenNow ? "Establecimiento Cerrado" : "Pedidos no disponibles"}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {!isOpenNow
                                        ? (nextOpenText || "Vuelve a intentarlo dentro del horario comercial.")
                                        : "En este momento no podemos aceptar pedidos desde la web."}
                                </p>
                            </div>
                        )}

                        {inactiveError && (
                            <div className="mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium">{inactiveError}</p>
                            </div>
                        )}

                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {/* Left Column: Products List - ALWAYS VISIBLE */}
                            <motion.div className="lg:col-span-2" variants={fadeInUp}>
                                <div className="border border-border rounded-xl overflow-hidden shadow-sm">
                                    {/* Table Header */}
                                    <div className="bg-muted/50 text-foreground px-6 md:px-8 py-4 hidden md:grid grid-cols-12 gap-6 text-xs font-bold tracking-wide border-b border-border uppercase">
                                        <div className="col-span-5">Producto</div>
                                        <div className="col-span-2 text-center">Precio</div>
                                        <div className="col-span-3 text-center">Cantidad</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>

                                    {/* Items */}
                                    <div className="bg-card divide-y divide-border">
                                        {cartItems.length === 0 ? (
                                            <div className="p-16 text-center">
                                                <p className="text-muted-foreground mb-6 text-base">El carrito está vacío</p>
                                                <Button asChild size="lg">
                                                    <a href="/menu">Ver el menú</a>
                                                </Button>
                                            </div>
                                        ) : (
                                            cartItems.map((item) => (
                                                <div key={item.name} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group transition-colors hover:bg-muted/5">
                                                    {/* Product Info */}
                                                    <div className="md:col-span-5 flex items-center gap-6">
                                                        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-secondary rounded-lg overflow-hidden border border-border shadow-sm">
                                                            {item.image ? (
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                                                                    Sin foto
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-foreground text-sm md:text-base leading-tight mb-1">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-xs text-muted-foreground hidden md:block">
                                                                Delicioso y recién hecho
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Price (Desktop) */}
                                                    <div className="md:col-span-2 text-center hidden md:block font-bold text-base text-muted-foreground">
                                                        {item.unitPrice.toFixed(2)}€
                                                    </div>

                                                    {/* Quantity */}
                                                    <div className="md:col-span-3 flex items-center justify-between md:justify-center gap-4">
                                                        <span className="md:hidden font-medium text-sm">Cantidad:</span>
                                                        <div className="flex items-center border border-border rounded-lg bg-background shadow-sm">
                                                            <button
                                                                onClick={() => decrease(item.name)}
                                                                className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors text-base"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                                            <button
                                                                onClick={() => increase(item.name)}
                                                                className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors text-base"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Total & Action */}
                                                    <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                                                        <span className="md:hidden font-bold text-sm">Total:</span>
                                                        <div className="flex items-center gap-6">
                                                            <span className="font-bold text-lg text-primary">
                                                                {(item.unitPrice * item.quantity).toFixed(2)}€
                                                            </span>
                                                            <button
                                                                onClick={() => removeItem(item.name)}
                                                                className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-destructive/10 rounded-full"
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column: Checkout Form / Summary - ALWAYS VISIBLE if items exist */}
                            <motion.div className="lg:col-span-1" variants={fadeInUp}>
                                <div className="sticky top-24 space-y-6">
                                    {/* Order Summary Card */}
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

                                        {/* Checkout Logic Integrated Here */}
                                        {cartItems.length > 0 && canOrder && (
                                            <div className="space-y-6 pt-4 border-t border-border">
                                                {/* 1. Time Selection */}
                                                <div className="space-y-3">
                                                    <h4 className="font-semibold text-sm flex items-center gap-2">
                                                        <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                                        Hora de recogida
                                                    </h4>
                                                    <div className="grid grid-cols-3 gap-2">
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

                                                {/* 2. Client Details (Only show if time selected?) Or always show? Let's always show for seamlessness */}
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
                                                    onClick={submit}
                                                >
                                                    Encargar Ahora
                                                </Button>
                                            </div>
                                        )}

                                        {(!canOrder || cartItems.length === 0) && (
                                            <div className="bg-secondary/50 p-4 rounded-lg text-center text-sm text-muted-foreground mt-4">
                                                {cartItems.length === 0 ? "Añade productos para continuar" : "Pedidos no disponibles en este momento"}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </section>

                <InstagramSection />
            </main>
            <SiteFooter />

            <OrderSuccessDialog
                open={toastOpen}
                onOpenChange={setToastOpen}
                message={toastMessage}
                lastOrder={lastOrder}
                onViewOrder={() => {
                    setToastOpen(false)
                }}
            />
        </div >
    )
}
