"use client"

import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import PageHero from "@/components/sections/page-hero"
import InstagramSection from "@/components/sections/instagram-section"
import DesktopCartPanel from "@/components/features/encargar/desktop-cart-panel"
import StepContentComp from "@/components/features/encargar/step-content"
import { useOrderPage } from "@/hooks/use-order-page"
import InactiveAlerts from "@/components/features/encargar/inactive-alerts"
import MenuProductGrid from "@/components/features/encargar/menu-product-grid"
import MobileCartBar from "@/components/features/encargar/mobile-cart-bar"
import OrderSuccessDialog from "@/components/features/encargar/order-success-dialog"

export default function PedirPage() {
    const {
        cart, name, setName, phone, setPhone, pickupTime, setPickupTime,
        errors, step, setStep, mobileCartOpen, setMobileCartOpen,
        activeCategory, productsRef, toastOpen, setToastOpen,
        toastMessage, lastOrder, inactiveNames, inactiveError,
        isOpenNow, nextOpenText, slots, canOrder,
        total, bagFee, finalTotal, allCategories, beveragesByCategory,
        addToCart, increase, decrease, removeItem, submit, scrollToCategory,
        menuCategories, comboMeals, mojos
    } = useOrderPage()

    return (
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
            <SiteHeader />
            <main className="flex-1">
                <PageHero
                    image="/images/hero-cart.jpg"
                    imageAlt="Plato con pollo asado y ajo"
                    subtitle="Pidenos ahora"
                    titleWhite="ENCARGA"
                    titleRed="TU PEDIDO"
                    description="Elige tus platos, selecciona la hora de recogida y confirma tus datos. Pago y recogida en el local, facil y sencillo."
                />

                <section className="py-12 md:py-16 bg-background">
                    <div className={`container mx-auto px-4 md:px-6 max-w-7xl relative ${!canOrder ? "pointer-events-none select-none overflow-hidden" : ""}`}>
                        {(!canOrder) && (
                            <div className="absolute inset-0 z-40 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-xl">
                                <div className="max-w-xl mx-auto text-center px-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                        {!isOpenNow ? "Establecimiento Cerrado" : "Pedidos no disponibles"}
                                    </h2>
                                    <p className="text-lg md:text-xl text-muted-foreground font-body">
                                        {!isOpenNow
                                            ? (nextOpenText || "Vuelve a intentarlo dentro del horario comercial.")
                                            : "En este momento no podemos aceptar pedidos desde la web."}
                                    </p>
                                    <p className="text-sm text-muted-foreground/60 font-body mt-4">
                                        Puedes consultar el menu en la pagina principal o llamarnos por telefono.
                                    </p>
                                </div>
                            </div>
                        )}

                        <InactiveAlerts
                            inactiveError={inactiveError}
                            inactiveNames={inactiveNames}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                            <MenuProductGrid
                                productsRef={productsRef}
                                allCategories={allCategories}
                                activeCategory={activeCategory}
                                scrollToCategory={scrollToCategory}
                                menuCategories={menuCategories}
                                cart={cart}
                                inactiveNames={inactiveNames}
                                canOrder={canOrder}
                                addToCart={addToCart}
                                increase={increase}
                                decrease={decrease}
                                removeItem={removeItem}
                                comboMeals={comboMeals as any[]}
                                mojos={mojos as any[]}
                                beveragesByCategory={beveragesByCategory}
                            />

                            <div className="space-y-6">
                                <DesktopCartPanel
                                    items={Object.values(cart)}
                                    total={finalTotal}
                                    bagFee={bagFee}
                                    pickupTime={pickupTime}
                                    isOpenNow={canOrder}
                                    inactiveNames={inactiveNames}
                                    onChooseHour={() => setStep("hora")}
                                    onIncrease={(name) => increase(name)}
                                    onDecrease={(name) => decrease(name)}
                                    onRemove={(name) => removeItem(name)}
                                />

                                {(step === "hora" || step === "cliente" || step === "confirmacion") && (
                                    <div className="bg-card rounded-2xl border border-border shadow-sm p-8 hidden md:block">
                                        <StepContentComp
                                            variant="desktop"
                                            step={step}
                                            setStep={setStep}
                                            slots={slots}
                                            isOpenNow={isOpenNow}
                                            pickupTime={pickupTime}
                                            setPickupTime={setPickupTime}
                                            name={name}
                                            setName={setName}
                                            phone={phone}
                                            setPhone={setPhone}
                                            errors={errors}
                                            cartItems={Object.values(cart)}
                                            total={finalTotal}
                                            bagFee={bagFee}
                                            submit={submit}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <MobileCartBar
                    canOrder={canOrder}
                    mobileCartOpen={mobileCartOpen}
                    setMobileCartOpen={setMobileCartOpen}
                    finalTotal={finalTotal}
                    pickupTime={pickupTime}
                    setPickupTime={setPickupTime}
                    cart={cart}
                    inactiveNames={inactiveNames}
                    total={total}
                    bagFee={bagFee}
                    step={step}
                    setStep={setStep}
                    slots={slots}
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    errors={errors}
                    submit={submit}
                    increase={increase}
                    decrease={decrease}
                    removeItem={removeItem}
                />

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
                    setMobileCartOpen(true)
                }}
            />
        </div>
    )
}
