"use client"

import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import PageHero from "@/components/common/page-hero"
import InstagramBanner from "@/components/common/instagram-banner"
import OrderSuccessDialog from "@/components/sections/cart/order-success-dialog"
import { useOrderPage } from "@/hooks/use-order-page"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/components/sections/menu/animations"
import { CartItemsList } from "@/components/sections/cart/cart-items-list"
import { CheckoutSummary } from "@/components/sections/cart/checkout-summary"
import { StoreStatusAlerts } from "@/components/sections/cart/store-status-alerts"

export default function PedirPage() {
    const {
        cart, name, setName, email, setEmail, phone, setPhone, pickupTime, setPickupTime,
        errors, toastOpen, setToastOpen, toastMessage, lastOrder,
        isOpenNow, nextOpenText, slots, canOrder,
        total, bagFee, finalTotal,
        increase, decrease, removeItem, submit,
        inactiveError
    } = useOrderPage()

    const cartItems = Object.values(cart)

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1">
                <PageHero
                    image="/images/cart/cart-hero.jpg"
                    imageAlt="Plato con pollo asado y ajo"
                    subtitle="Pídenos ahora"
                    titleWhite="ENCARGA"
                    titleRed="TU PEDIDO"
                    description="Elige tus platos, selecciona la hora de recogida y confirma tus datos. Pago y recogida en el local, facil y sencillo."
                />

                <section className="py-12 md:py-16 bg-background">
                    <div className="container mx-auto px-4 md:px-6 max-w-[95%]">

                        <StoreStatusAlerts
                            isOpenNow={isOpenNow}
                            nextOpenText={nextOpenText}
                            canOrder={canOrder}
                            inactiveError={inactiveError}
                        />

                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {/* Columna Izquierda: Lista de Productos */}
                            <motion.div className="lg:col-span-2" variants={fadeInUp}>
                                <CartItemsList
                                    items={cartItems}
                                    onIncrease={increase}
                                    onDecrease={decrease}
                                    onRemove={removeItem}
                                />
                            </motion.div>

                            {/* Columna Derecha: Resumen y Checkout */}
                            <motion.div className="lg:col-span-1" variants={fadeInUp}>
                                <div className="sticky top-24 space-y-6">
                                    <CheckoutSummary
                                        total={total}
                                        bagFee={bagFee}
                                        finalTotal={finalTotal}
                                        canOrder={canOrder}
                                        hasItems={cartItems.length > 0}
                                        slots={slots}
                                        pickupTime={pickupTime}
                                        setPickupTime={setPickupTime}
                                        customerData={{ name, email, phone }}
                                        setCustomerData={{ setName, setEmail, setPhone }}
                                        errors={errors}
                                        onSubmit={submit}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <InstagramBanner />
            </main>
            <SiteFooter />

            <OrderSuccessDialog
                open={toastOpen}
                onOpenChange={setToastOpen}
                message={toastMessage}
                lastOrder={lastOrder}
                onViewOrder={() => setToastOpen(false)}
            />
        </div>
    )
}

