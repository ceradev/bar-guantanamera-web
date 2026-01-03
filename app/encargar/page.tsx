"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import menuData from "@/data/menu-data.json"
import type { MenuData } from "@/types/menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, CupSoda, Beer, GlassWater, Flame } from "lucide-react"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import * as Toast from "@radix-ui/react-toast"
import { useCart } from "@/hooks/use-cart"
import { useBusinessHours } from "@/hooks/use-business-hours"
import { useCategoryScroll } from "@/hooks/use-category-scroll"
import CartItemRowComp from "@/components/features/encargar/cart-item-row"
import ProductCard from "@/components/features/encargar/product-card"
import CategoryTabs from "@/components/features/encargar/category-tabs"
import DesktopCartPanel from "@/components/features/encargar/desktop-cart-panel"
import StepContentComp from "@/components/features/encargar/step-content"
import { formatPrice } from "@/lib/pricing"
import { groupBeverages } from "@/lib/menu"
import type { OrderStep } from "@/types/order"
import { processOrderSubmission } from "@/lib/order"
import { BUSINESS_HOURS } from "@/data/business-hours"

const { menuCategories, bebidas, mojos, comboMeals } = menuData as MenuData


export default function PedirPage() {
    const { cart, addToCart, increase, decrease, removeItem, total, setCart } = useCart()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [pickupTime, setPickupTime] = useState("")
    const [errors, setErrors] = useState<string[]>([])
    const [step, setStep] = useState<OrderStep>("productos")
    const [mobileCartOpen, setMobileCartOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const productsRef = useRef<HTMLDivElement>(null)
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const { slots, isOpenNow, nextOpenText } = useBusinessHours(BUSINESS_HOURS)

    const submit = () => {
        const { errors, message } = processOrderSubmission({
            name,
            phone,
            pickupTime,
            total,
            cartCount: Object.keys(cart).length,
        })
        setErrors(errors)
        if (errors.length === 0 && message) {
            setToastMessage(message)
            setToastOpen(true)
            setCart({})
            setName("")
            setPhone("")
            setPickupTime("")
            setStep("productos")
            setMobileCartOpen(false)
        }
    }

    const allCategories = useMemo(() => ({
        ...menuCategories,
        combos: { title: "Platos Combinados", subtitle: "" },
        salsas: { title: "Mojos y Salsas", subtitle: "" },
        bebidas: { title: "Bebidas", subtitle: "" },
    }), [])

    const beveragesByCategory = useMemo(() => groupBeverages(bebidas as any), [])
    const sectionKeys = useMemo(() => Object.keys(allCategories), [allCategories])
    const { activeCategory: activeCategoryFromHook, scrollToCategory } = useCategoryScroll(productsRef as React.RefObject<HTMLDivElement>, sectionKeys)
    useEffect(() => { setActiveCategory(activeCategoryFromHook) }, [activeCategoryFromHook])

    return (
        <Toast.Provider swipeDirection="right">
            <SiteHeader />
            { /* Encabezado de la página */}
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl py-10 md:py-16">
                    <div className="text-center mb-10 md:mb-12">
                        <Badge className="bg-red-600 hover:bg-red-700 text-white mb-4 px-4 py-1 text-sm uppercase tracking-wider">
                            <ShoppingCart className="inline-block mr-2 w-4 h-4" />
                            Pedido para llevar
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            Encarga tu <span className="text-red-600">pedido</span>
                        </h2>
                        <p className="text-gray-600 max-w-xl mx-auto text-lg">
                            Elige tus platos, selecciona la hora de recogida y confirma tus datos.
                            Pago y recogida en el local, fácil y rápido.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                        {!isOpenNow && (
                            <div className="lg:col-span-3">
                                <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                                    {nextOpenText}
                                </div>
                            </div>
                        )}
                        <div className="lg:col-span-3 lg:col-start-1">
                            {/* Pestañas de categorías */}
                            <CategoryTabs categories={allCategories} activeKey={activeCategory} onSelect={scrollToCategory} />
                        </div>

                        {/* Contenedor scrollable de productos por categoría */}
                        <div ref={productsRef} className="lg:col-span-2 lg:col-start-1 space-y-8 overflow-y-auto md:max-h-[85vh] max-h-[calc(100vh-220px)] pr-2">
                            {Object.entries(menuCategories).map(([key, category]) => (
                                <section key={key} id={`cat-${key}`} className="space-y-4">
                                    <div className="flex items-baseline justify-between">
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{category.title}</h3>
                                        <span className="text-base text-gray-500">{category.subtitle}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {category.items.map(item => {
                                            const inCart = cart[item.name]
                                            return (
                                                <div key={item.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
                                                    <ProductCard
                                                        item={item as any}
                                                        inCart={inCart}
                                                        isOpenNow={isOpenNow}
                                                        onAdd={() => addToCart(item)}
                                                        onIncrease={() => increase(item.name)}
                                                        onDecrease={() => decrease(item.name)}
                                                        onRemove={() => removeItem(item.name)}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>
                            ))}
                            {/* Sección: Platos combinados */}
                            <section className="space-y-4" id="cat-combos">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Platos Combinados</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(comboMeals as any[]).map(combo => (
                                        <div key={combo.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-start gap-4">
                                            <div className="text-5xl leading-none">{combo.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex items-baseline justify-between">
                                                    <div className="text-gray-900 font-semibold text-lg">{combo.name}</div>
                                                    <div className="text-red-600 font-bold text-lg">{combo.price}</div>
                                                </div>
                                                {combo.description && (
                                                    <div className="text-base text-gray-500 mt-2">{combo.description}</div>
                                                )}
                                                <div className="mt-4">
                                                    <Button
                                                        onClick={() => addToCart({ name: combo.name, price: combo.price } as any)}
                                                        className="bg-red-600 text-white hover:bg-red-700 rounded-full"
                                                    >
                                                        + Añadir
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Sección: Mojos y salsas */}
                            <section className="space-y-4" id="cat-salsas">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Mojos y Salsas</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(mojos as any[]).map(mojo => (
                                        <div key={mojo.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                                    {mojo.spicy ? <Flame className="w-5 h-5 text-red-600" /> : <span className="text-xl">🫙</span>}
                                                </div>
                                                <div>
                                                    <div className="text-gray-900 font-semibold text-lg">{mojo.name}</div>
                                                    {mojo.spicy && <div className="text-xs text-red-500 mt-1">Picante</div>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-red-600 font-bold text-lg">{mojo.price}</div>
                                                <Button
                                                    onClick={() => addToCart({ name: mojo.name, price: mojo.price } as any)}
                                                    variant="outline"
                                                    className="rounded-full"
                                                >
                                                    + Añadir
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Sección: Bebidas */}
                            <section className="space-y-4" id="cat-bebidas">
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Bebidas</h3>
                                </div>
                                <div className="space-y-6">
                                    {Object.entries(beveragesByCategory).map(([category, drinks]) => (
                                        <div key={category} className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                {category === "refrescos" && <CupSoda className="w-5 h-5 text-red-600" />}
                                                {category === "cervezas" && <Beer className="w-5 h-5 text-amber-600" />}
                                                {category === "agua" && <GlassWater className="w-5 h-5 text-blue-600" />}
                                                <h4 className="text-lg font-semibold text-gray-900 capitalize">{category}</h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {drinks.map((drink: any) => (
                                                    <div key={drink.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-center justify-between">
                                                        <div className="flex items-center gap-3 flex-1">
                                                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                                                {category === "refrescos" && <CupSoda className="w-5 h-5 text-red-600" />}
                                                                {category === "cervezas" && <Beer className="w-5 h-5 text-amber-600" />}
                                                                {category === "agua" && <GlassWater className="w-5 h-5 text-blue-600" />}
                                                            </div>
                                                            <div className="text-gray-900 font-semibold text-lg">{drink.name}</div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-red-600 font-bold text-lg">{drink.price}</div>
                                                            <Button
                                                                onClick={() => addToCart({ name: drink.name, price: drink.price } as any)}
                                                                variant="outline"
                                                                className="rounded-full"
                                                            >
                                                                + Añadir
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Panel lateral derecho */}
                        <div className="space-y-6">
                            {/* Panel de carrito (escritorio) */}
                            <DesktopCartPanel
                                items={Object.values(cart)}
                                total={total}
                                pickupTime={pickupTime}
                                isOpenNow={isOpenNow}
                                onChooseHour={() => setStep("hora")}
                                onIncrease={(name) => increase(name)}
                                onDecrease={(name) => decrease(name)}
                                onRemove={(name) => removeItem(name)}
                            />


                            {/* Flujo de pasos en escritorio (hora/cliente/confirmación) */}
                            {(step === "hora" || step === "cliente" || step === "confirmacion") && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 hidden md:block">
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
                                        total={total}
                                        submit={submit}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Barra inferior móvil y carrito */}
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 md:hidden">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">Ver pedido</div>
                        <div className="text-lg font-bold text-red-600">{formatPrice(total)}</div>
                    </div>
                    <div className="mt-2">
                        <Sheet open={mobileCartOpen} onOpenChange={setMobileCartOpen}>
                            <SheetTrigger asChild>
                                <Button className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full">Abrir carrito</Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
                                <SheetHeader>
                                    <SheetTitle>Tu pedido</SheetTitle>
                                    <div className="text-xs text-gray-600 mt-1">
                                        Hora seleccionada: <span className="font-semibold">{pickupTime || "Sin seleccionar"}</span>
                                    </div>
                                </SheetHeader>
                                <div className="mt-4 space-y-4 overflow-y-auto max-h-[calc(80vh-80px)] pr-1">
                                    {Object.values(cart).map(it => (
                                        <CartItemRowComp
                                            key={it.name}
                                            item={it}
                                            mobile
                                            onDecrease={() => decrease(it.name)}
                                            onIncrease={() => increase(it.name)}
                                            onRemove={() => removeItem(it.name)}
                                        />
                                    ))}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="text-sm text-gray-600">Total</div>
                                        <div className="text-lg font-bold text-gray-900">{formatPrice(total)}</div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setStep("hora")
                                        }}
                                        className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full"
                                        disabled={Object.keys(cart).length === 0}
                                    >
                                        Elegir hora
                                    </Button>
                                    {/* Flujo de pasos en móvil */}
                                    <StepContentComp
                                        variant="mobile"
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
                                        total={total}
                                        submit={submit}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
            {/* Pie del sitio */}
            <SiteFooter />
            {/* Notificación de confirmación de pedido */}
            <Toast.Root
                open={toastOpen}
                onOpenChange={setToastOpen}
                duration={5000}
                className="bg-white border border-green-200 shadow-lg rounded-xl p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out"
            >
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                        <Toast.Title className="text-sm font-semibold text-gray-900">Pedido confirmado</Toast.Title>
                        <Toast.Description className="text-sm text-gray-700 mt-1">{toastMessage}</Toast.Description>
                    </div>
                    <Toast.Close asChild>
                        <Button variant="outline" size="sm" className="rounded-full">Cerrar</Button>
                    </Toast.Close>
                </div>
            </Toast.Root>
            <Toast.Viewport className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100%-1rem)] outline-none" />
        </Toast.Provider>
    )
}
