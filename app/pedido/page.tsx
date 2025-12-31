"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import menuData from "@/data/menu-data.json"
import type { MenuData, MenuItem } from "@/types/menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Minus, Plus, Trash2, Clock, User, Phone, CupSoda, Beer, GlassWater, Flame } from "lucide-react"
import Image from "next/image"
import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const { menuCategories, bebidas, mojos, comboMeals } = menuData as MenuData

type CartItem = {
    name: string
    unitPrice: number
    quantity: number
}

function parsePrice(input: string) {
    const match = input.match(/(\d+[\.,]?\d*)/)
    if (!match) return 0
    return parseFloat(match[1].replace(",", "."))
}

function formatPrice(n: number) {
    return `${n.toFixed(2)}€`
}

const businessHours = [
    { dayLabel: "Lunes, Jueves y Viernes", hours: "09:00 - 18:00", days: [1, 4, 5] },
    { dayLabel: "Sábados y Domingos", hours: "09:00 - 17:00", days: [6, 0] },
    { dayLabel: "Martes, Miércoles", hours: "Cerrado", days: [2, 3] },
]

function getTodaySchedule() {
    const today = new Date().getDay()
    const schedule = businessHours.find(s => s.days.includes(today))
    if (!schedule || schedule.hours === "Cerrado") return null
    const [openStr, closeStr] = schedule.hours.split(" - ")
    const [openH, openM] = openStr.split(":").map(Number)
    const [closeH, closeM] = closeStr.split(":").map(Number)
    const open = new Date()
    open.setHours(openH, openM, 0, 0)
    const close = new Date()
    close.setHours(closeH, closeM, 0, 0)
    return { open, close }
}

function roundUpToQuarter(d: Date) {
    const minutes = d.getMinutes()
    const add = minutes % 15 === 0 ? 0 : 15 - (minutes % 15)
    const rounded = new Date(d)
    rounded.setMinutes(minutes + add, 0, 0)
    return rounded
}

function getPickupSlots(prepMarginMinutes = 15) {
    const schedule = getTodaySchedule()
    if (!schedule) return []
    const now = new Date()
    const earliest = roundUpToQuarter(new Date(now.getTime() + prepMarginMinutes * 60000))
    const start = earliest > schedule.open ? earliest : schedule.open
    const slots: string[] = []
    const cursor = new Date(start)
    while (cursor <= schedule.close) {
        const h = String(cursor.getHours()).padStart(2, "0")
        const m = String(cursor.getMinutes()).padStart(2, "0")
        slots.push(`${h}:${m}`)
        cursor.setMinutes(cursor.getMinutes() + 15)
    }
    return slots
}

export default function PedidoPage() {
    const [cart, setCart] = useState<Record<string, CartItem>>({})
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [pickupTime, setPickupTime] = useState("")
    const [errors, setErrors] = useState<string[]>([])
    const [step, setStep] = useState<"productos" | "hora" | "cliente">("productos")
    const [mobileCartOpen, setMobileCartOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string | null>(null)
    const productsRef = useRef<HTMLDivElement>(null)

    const addToCart = (item: MenuItem) => {
        const price = parsePrice(item.price)
        setCart(prev => {
            const existing = prev[item.name]
            const nextQty = existing ? existing.quantity + 1 : 1
            return {
                ...prev,
                [item.name]: {
                    name: item.name,
                    unitPrice: price,
                    quantity: nextQty,
                }
            }
        })
    }

    const increase = (key: string) => {
        setCart(prev => {
            const current = prev[key]
            if (!current) return prev
            return { ...prev, [key]: { ...current, quantity: current.quantity + 1 } }
        })
    }

    const decrease = (key: string) => {
        setCart(prev => {
            const current = prev[key]
            if (!current) return prev
            const nextQty = current.quantity - 1
            if (nextQty <= 0) {
                const { [key]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [key]: { ...current, quantity: nextQty } }
        })
    }

    const removeItem = (key: string) => {
        setCart(prev => {
            const { [key]: _, ...rest } = prev
            return rest
        })
    }

    const itemsList = useMemo(() => {
        return Object.values(menuCategories).flatMap(cat => cat.items)
            .concat(bebidas as any)
            .concat(mojos as any)
            .concat(comboMeals as any)
    }, [])

    const total = useMemo(() => {
        return Object.values(cart).reduce((sum, it) => sum + it.unitPrice * it.quantity, 0)
    }, [cart])

    const slots = useMemo(() => getPickupSlots(15), [])

    useEffect(() => {
        if (slots.length && !pickupTime) setPickupTime(slots[0] || "")
    }, [slots, pickupTime])

    const isOpenNow = useMemo(() => {
        const schedule = getTodaySchedule()
        if (!schedule) return false
        const now = new Date()
        return now >= schedule.open && now <= schedule.close
    }, [])
    const nextOpenText = useMemo(() => {
        const names = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
        const today = new Date()
        const schedule = getTodaySchedule()
        if (schedule) {
            const now = new Date()
            if (now < schedule.open) {
                const h = String(schedule.open.getHours()).padStart(2, "0")
                const m = String(schedule.open.getMinutes()).padStart(2, "0")
                return `Abrimos hoy a las ${h}:${m}`
            }
        }
        for (let i = 1; i <= 7; i++) {
            const d = new Date(today)
            d.setDate(d.getDate() + i)
            const idx = d.getDay()
            const next = businessHours.find(b => b.days.includes(idx) && b.hours !== "Cerrado")
            if (next) {
                const [openStr] = next.hours.split(" - ")
                return `Estamos cerrados. Volvemos ${i === 1 ? "mañana" : `el ${names[idx]}`} a las ${openStr}`
            }
        }
        return "Estamos cerrados."
    }, [])
    const submit = () => {
        const errs: string[] = []
        if (Object.keys(cart).length === 0) errs.push("Añade productos al carrito.")
        if (!name.trim()) errs.push("Introduce tu nombre.")
        if (!pickupTime) errs.push("Selecciona una hora de recogida.")
        if (total > 30 && !phone.trim()) errs.push("El teléfono es obligatorio para pedidos mayores de 30€.")
        setErrors(errs)
        if (errs.length === 0) {
            setErrors(["Pedido preparado. Preséntate en el local a la hora seleccionada."])
        }
    }

    const categoryEmojis: Record<string, string> = {
        pollos: "🍗",
        costillasYPatas: "🥩",
        guarniciones: "🍟",
        quesadillasYBurritos: "🌯",
        combos: "🍱",
        salsas: "🫙",
        bebidas: "🥤",
    }

    const extraCategories = {
        combos: { title: "Platos Combinados", subtitle: "" },
        salsas: { title: "Mojos y Salsas", subtitle: "" },
        bebidas: { title: "Bebidas", subtitle: "" },
    }

    const beveragesByCategory = useMemo(() => {
        const groups: Record<string, any[]> = { refrescos: [], cervezas: [], agua: [] }
        ;(bebidas as any[]).forEach(drink => {
            const key = drink.category && groups[drink.category] ? drink.category : "refrescos"
            groups[key].push(drink)
        })
        return groups
    }, [])
    const sectionKeys = useMemo(() => [...Object.keys(menuCategories), ...Object.keys(extraCategories)], [])
    useEffect(() => {
        const root = productsRef.current
        if (!root) return
        const obs = new IntersectionObserver((entries) => {
            let best: IntersectionObserverEntry | null = null
            entries.forEach(e => {
                if (e.isIntersecting) {
                    if (!best || e.intersectionRatio > best.intersectionRatio) best = e
                }
            })
            if (best) {
                const id = (best.target as Element).id.replace("cat-", "")
                setActiveCategory(id)
            }
        }, { root, threshold: [0.3, 0.6, 0.9], rootMargin: "0px 0px -40% 0px" })
        sectionKeys.forEach(key => {
            const el = document.getElementById(`cat-${key}`)
            if (el) obs.observe(el)
        })
        return () => obs.disconnect()
    }, [sectionKeys])

    return (
        <>
            <SiteHeader />
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
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="text-base md:text-lg font-semibold text-gray-700 uppercase tracking-wider mb-4">Categorías</h3>
                                <div className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory">
                                    {[...Object.entries(menuCategories), ...Object.entries(extraCategories)].map(([key, category]) => (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                setActiveCategory(key)
                                                const el = document.getElementById(`cat-${key}`)
                                                if (el && productsRef.current) {
                                                    const top = el.offsetTop - 8
                                                    productsRef.current.scrollTo({ top, behavior: "smooth" })
                                                }
                                            }}
                                            className={`px-7 py-3.5 rounded-xl text-left transition-colors text-base font-semibold min-w-[200px] border snap-start ${
                                                activeCategory === key ? "bg-red-50 text-red-600 border-red-600" : "hover:bg-gray-50 text-gray-800 border-gray-200/60"
                                            }`}
                                        >
                                            <span className="font-semibold">{category.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div ref={productsRef} className="lg:col-span-2 lg:col-start-1 space-y-8 overflow-y-auto md:max-h-[75vh] max-h-[calc(100vh-260px)] pr-2">
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
                                                    <div className="relative h-40 rounded-xl overflow-hidden bg-gray-50">
                                                        <Image
                                                            src={(item as any).image || "/images/placeholder.jpg"}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex items-start justify-between mt-4">
                                                        <div className="pr-4">
                                                            <div className="text-gray-900 font-semibold text-lg">{item.name}</div>
                                                            {item.description && (
                                                                <div className="text-base text-gray-500 mt-2 line-clamp-2">{item.description}</div>
                                                            )}
                                                        </div>
                                                        <div className="text-red-600 font-bold text-lg">{item.price}</div>
                                                    </div>
                                                    <div className="mt-4">
                                                        {!inCart ? (
                                        <Button
                                            onClick={() => addToCart(item)}
                                            className="bg-red-600 text-white hover:bg-red-700 rounded-full w-full py-3 text-base disabled:opacity-60"
                                            disabled={!isOpenNow}
                                        >
                                            + Añadir
                                        </Button>
                                                        ) : (
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={() => decrease(item.name)}>
                                                                        <Minus className="w-4 h-4" />
                                                                    </Button>
                                                                    <div className="w-12 text-center font-semibold text-lg">{inCart.quantity}</div>
                                                                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={() => increase(item.name)}>
                                                                        <Plus className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                                <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={() => removeItem(item.name)}>
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>
                            ))}
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

                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sticky top-24 hidden md:block">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrito</h2>
                                <div>
                                    {Object.keys(cart).length === 0 ? (
                                        <div className="text-base text-gray-500">Añade productos para ver tu pedido.</div>
                                    ) : (
                                        <div className="space-y-4">
                                            {Object.values(cart).map(it => (
                                                <div key={it.name} className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-gray-900 font-semibold text-base" title={it.name}>{it.name}</div>
                                                        <div className="text-sm text-gray-500">{formatPrice(it.unitPrice)} c/u</div>
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => decrease(it.name)}>
                                                                <Minus className="w-4 h-4" />
                                                            </Button>
                                                            <div className="w-10 text-center font-semibold text-base">{it.quantity}</div>
                                                            <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => increase(it.name)}>
                                                                <Plus className="w-4 h-4" />
                                                            </Button>
                                                            <Button variant="outline" size="icon" className="rounded-full h-9 w-9" onClick={() => removeItem(it.name)}>
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="w-24 text-right font-bold text-red-600 text-base flex-shrink-0">{formatPrice(it.unitPrice * it.quantity)}</div>
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-between pt-2">
                                                <div className="text-base text-gray-600">Total</div>
                                                <div className="text-2xl font-bold text-gray-900">{formatPrice(total)}</div>
                                            </div>
                                            <Button
                                                onClick={() => setStep("hora")}
                                                className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full py-3 text-base disabled:opacity-60"
                                                disabled={Object.keys(cart).length === 0 || !isOpenNow}
                                            >
                                                Elegir hora
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-8 ${step === "cliente" ? "" : "hidden md:block"}`}>
                                {step === "hora" && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-gray-500" />
                                            <h3 className="text-xl font-semibold text-gray-900">Selecciona la hora de recogida</h3>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {slots.map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => setPickupTime(s)}
                                                    className={`px-4 py-2.5 rounded-lg border text-base disabled:opacity-60 ${
                                                        pickupTime === s ? "border-red-600 text-red-600 bg-red-50" : "border-gray-200 text-gray-800 hover:bg-gray-50"
                                                    }`}
                                                    disabled={!isOpenNow}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <Button
                                            onClick={() => setStep("cliente")}
                                            className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full py-3 text-base disabled:opacity-60"
                                            disabled={!pickupTime || !isOpenNow}
                                        >
                                            Continuar
                                        </Button>
                                    </div>
                                )}

                                {step === "cliente" && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="text-base text-gray-700">Nombre de la persona que recoge el pedido</div>
                                            <div className="flex items-center gap-2">
                                                <User className="w-5 h-5 text-gray-500" />
                                                <input
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="Nombre de la persona que recoge el pedido"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <div className="text-base text-gray-700">Teléfono</div>
                                                <div className="text-sm text-gray-500">Obligatorio si el total supera 30€</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-5 h-5 text-gray-500" />
                                                <input
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    placeholder="Teléfono de contacto"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-600"
                                                />
                                            </div>
                                            {total > 30 && !phone.trim() && (
                                                <div className="text-xs text-red-600 mt-1">Para pedidos grandes necesitamos un teléfono por si surge algún problema.</div>
                                            )}
                                        </div>

                                        {errors.length > 0 && (
                                            <div className="rounded-lg bg-red-50 text-red-700 text-sm px-3 py-2">
                                                {errors.join(" ")}
                                            </div>
                                        )}

                                        <Button
                                            onClick={submit}
                                            className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full disabled:opacity-60"
                                            disabled={
                                                Object.keys(cart).length === 0 ||
                                                !pickupTime ||
                                                !name.trim() ||
                                                (total > 30 && !phone.trim()) ||
                                                !isOpenNow
                                            }
                                        >
                                            Encargar pedido
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
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
                                </SheetHeader>
                                <div className="mt-4 space-y-4">
                                    {Object.values(cart).map(it => (
                                        <div key={it.name} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-gray-900 font-medium" title={it.name}>{it.name}</div>
                                                <div className="text-xs text-gray-500">{formatPrice(it.unitPrice)} c/u</div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => decrease(it.name)}>
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                    <div className="w-8 text-center font-semibold">{it.quantity}</div>
                                                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => increase(it.name)}>
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => removeItem(it.name)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="w-20 text-right font-bold text-red-600 flex-shrink-0">{formatPrice(it.unitPrice * it.quantity)}</div>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="text-sm text-gray-600">Total</div>
                                        <div className="text-lg font-bold text-gray-900">{formatPrice(total)}</div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            setMobileCartOpen(false)
                                            setStep("hora")
                                        }}
                                        className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full"
                                        disabled={Object.keys(cart).length === 0}
                                    >
                                        Elegir hora
                                    </Button>
                                    {step === "hora" && (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-gray-500" />
                                                <h3 className="text-base font-semibold text-gray-900">Selecciona la hora de recogida</h3>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {slots.map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => setPickupTime(s)}
                                                        className={`px-3 py-2 rounded-lg border text-sm disabled:opacity-60 ${
                                                            pickupTime === s ? "border-red-600 text-red-600 bg-red-50" : "border-gray-200 text-gray-800 hover:bg-gray-50"
                                                        }`}
                                                        disabled={!isOpenNow}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    setMobileCartOpen(false)
                                                    setStep("cliente")
                                                }}
                                                className="w-full bg-red-600 text-white hover:bg-red-700 rounded-full"
                                                disabled={!pickupTime || !isOpenNow}
                                            >
                                                Continuar
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
            <SiteFooter />
        </>
    )
}
