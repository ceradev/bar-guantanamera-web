"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import menuData from "@/data/menu-data.json"
import type { MenuData } from "@/types/menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, CupSoda, Beer, GlassWater, Flame, CheckCircle } from "lucide-react"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Link from "next/link"

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
    const [lastOrder, setLastOrder] = useState<{ name: string; phone: string; pickupTime: string; total: number } | null>(null)
    const { slots, isOpenNow, nextOpenText } = useBusinessHours(BUSINESS_HOURS)
    const [inactiveNames, setInactiveNames] = useState<string[]>([])
    const [inactiveError, setInactiveError] = useState<string | null>(null)

    const submit = async () => {
        const { errors, message } = await processOrderSubmission({
            name,
            phone,
            pickupTime,
            total,
            cartCount: Object.keys(cart).length,
        }, Object.values(cart))
        setErrors(errors)
        if (errors.length === 0 && message) {
            setToastMessage(message)
            setLastOrder({ name, phone, pickupTime, total })
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
    useEffect(() => {
        let mounted = true
        const fetchInactive = async () => {
            try {
                const res = await fetch("http://localhost:8000/products/inactive-names")
                if (!res.ok) throw new Error(String(res.status))
                const data = await res.json()
                const names = Array.isArray(data) ? data : (Array.isArray(data?.names) ? data.names : [])
                if (mounted) {
                    setInactiveNames(names)
                    setInactiveError(null)
                }
            } catch {
                if (mounted) setInactiveError("No se pudo actualizar la lista de productos inactivos.")
            }
        }
        fetchInactive()
        const interval = setInterval(fetchInactive, 10000)
        return () => {
            mounted = false
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <SiteHeader />
            <div className="min-h-screen bg-white">
                <div className={isOpenNow ? "container mx-auto px-4 md:px-6 max-w-7xl py-10 md:py-16 relative" : "container mx-auto px-4 md:px-6 max-w-7xl py-10 md:py-16 relative pointer-events-none select-none overflow-hidden"}>
                    {!isOpenNow && (
                        <div className="absolute inset-0 z-40 bg-white/95 backdrop-blur-sm flex items-center justify-center">
                            <div className="max-w-xl mx-auto text-center px-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Estamos cerrados</h2>
                                <p className="text-lg md:text-xl text-gray-700">{nextOpenText}</p>
                                <p className="text-sm text-gray-500 mt-4">Puedes consultar el menu en la pagina principal y encargarnos tu pedido cuando estemos abiertos.</p>
                            </div>
                        </div>
                    )}
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
                    {inactiveError && (
                        <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                            {inactiveError}
                        </div>
                    )}
                    {inactiveNames.length > 0 && (
                        <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
                            <div className="text-sm font-semibold text-yellow-800">Productos temporalmente inactivos</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {inactiveNames.map(n => (
                                    <span key={n} className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                        {n}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                        <div className="lg:col-span-3 lg:col-start-1">
                            {/* Pestañas de categorías */}
                            <CategoryTabs categories={allCategories} activeKey={activeCategory} onSelect={scrollToCategory} />
                        </div>

                        {/* Contenedor scrollable de productos por categoría */}
                        <div ref={productsRef} className="lg:col-span-2 lg:col-start-1 space-y-8 overflow-y-auto md:min-h-[110vh] max-h-[calc(100vh-220px)] p-6 border border-gray-100 rounded-2xl">
                            {Object.entries(menuCategories).map(([key, category]) => (
                                <section key={key} id={`cat-${key}`} className="space-y-4">
                                    <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category.title}</h3>
                                        <span className="text-base text-gray-500">{category.subtitle}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {category.items.map(item => {
                                            const inCart = cart[item.name]
                                            const inactive = inactiveNames.includes(item.name)
                                            return (
                                                <ProductCard
                                                    key={item.name}
                                                    item={item as any}
                                                    inCart={inCart}
                                                    isOpenNow={isOpenNow}
                                                    inactive={inactive}
                                                    onAdd={() => addToCart(item)}
                                                    onIncrease={() => increase(item.name)}
                                                    onDecrease={() => decrease(item.name)}
                                                    onRemove={() => removeItem(item.name)}
                                                />
                                            )
                                        })}
                                    </div>
                                </section>
                            ))}
                            {/* Sección: Platos combinados */}
                            <section className="space-y-4" id="cat-combos">
                                <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Platos Combinados</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(comboMeals as any[]).map(combo => (
                                        <div key={combo.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-start gap-4">
                                            <div className="text-5xl leading-none">{combo.icon}</div>
                                            <div className="flex-1">
                                                <div className="flex items-baseline justify-between">
                                                    <div className="text-gray-900 font-semibold text-lg flex-1">{combo.name}</div>
                                                    <div className="text-red-600 font-bold text-md">{combo.price}</div>
                                                </div>
                                                {combo.description && (
                                                    <div className="text-base text-gray-500 mt-2">{combo.description}</div>
                                                )}
                                                <div className="mt-4">
                                                    <Button
                                                        onClick={() => addToCart({ name: combo.name, price: combo.price } as any)}
                                                        className="bg-red-600 text-white hover:bg-red-700 rounded-full"
                                                        disabled={inactiveNames.includes(combo.name) || !isOpenNow}
                                                    >
                                                        {inactiveNames.includes(combo.name) ? "No disponible" : "+ Añadir"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Sección: Mojos y salsas */}
                            <section className="space-y-4" id="cat-salsas">
                                <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
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
                                                    <div className="text-gray-900 font-semibold text-md">{mojo.name}</div>
                                                    {mojo.spicy && <div className="text-xs text-red-500 mt-1">Picante</div>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-red-600 font-bold text-md mr-2">{mojo.price}</div>
                                                <Button
                                                    onClick={() => addToCart({ name: mojo.name, price: mojo.price } as any)}
                                                    variant="outline"
                                                    className="rounded-full"
                                                    disabled={inactiveNames.includes(mojo.name) || !isOpenNow}
                                                >
                                                    {inactiveNames.includes(mojo.name) ? "No disponible" : "+ Añadir"}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Sección: Bebidas */}
                            <section className="space-y-4" id="cat-bebidas">
                                <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Bebidas</h3>
                                </div>
                                <div className="space-y-6">
                                    {Object.entries(beveragesByCategory).map(([category, drinks]) => (
                                        <div key={category} className="space-y-3">
                                            <div className="flex items-center gap-3 border-b border-gray-100 px-2 py-2">
                                                {category === "refrescos" && <CupSoda className="w-5 h-5 text-red-600" />}
                                                {category === "cervezas" && <Beer className="w-5 h-5 text-amber-600" />}
                                                {category === "agua" && <GlassWater className="w-5 h-5 text-blue-600" />}
                                                <h4 className="text-lg font-semibold text-gray-900 capitalize">{category}</h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {drinks.map((drink: any) => (
                                                    <div key={drink.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-center justify-between">
                                                        <div className="flex items-center gap-3 flex-1">
                                                            <div className="text-gray-900 font-semibold text-md">{drink.name}</div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-red-600 font-bold text-md mr-2">{drink.price}</div>
                                                            <Button
                                                                onClick={() => addToCart({ name: drink.name, price: drink.price } as any)}
                                                                variant="outline"
                                                                className="rounded-full"
                                                                disabled={inactiveNames.includes(drink.name) || !isOpenNow}
                                                            >
                                                                {inactiveNames.includes(drink.name) ? "No disponible" : "+ Añadir"}
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
                                inactiveNames={inactiveNames}
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
                {isOpenNow && (
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
                                            inactive={inactiveNames.includes(it.name)}
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
                )}
            </div>
            {/* Pie del sitio */}
            <SiteFooter />
            <Dialog open={toastOpen} onOpenChange={setToastOpen}>
                <DialogContent className="sm:max-w-lg border border-red-200">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900 text-center">Pedido confirmado</DialogTitle>
                        <DialogDescription className="text-gray-700 text-center">{toastMessage}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                        <div>Nombre: <span className="font-semibold">{lastOrder?.name || "—"}</span></div>
                        <div>Teléfono: <span className="font-semibold">{lastOrder?.phone || "—"}</span></div>
                        <div>Hora de recogida: <span className="font-semibold">{lastOrder?.pickupTime || "Sin seleccionar"}</span></div>
                        <div>Total: <span className="font-semibold">{formatPrice(lastOrder?.total ?? 0)}</span></div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                        <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() => {
                                setToastOpen(false)
                                setMobileCartOpen(true)
                            }}
                        >
                            Ver pedido
                        </Button>
                        <Button asChild variant="outline" className="rounded-full">
                            <Link href="/">
                                Volver a la página principal
                            </Link>
                        </Button>
                        <Button onClick={() => setToastOpen(false)} className="bg-red-600 text-white hover:bg-red-700 rounded-full">
                            Cerrar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
