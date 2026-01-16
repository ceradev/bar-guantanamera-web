"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import menuData from "@/data/menu.json"
import type { MenuData } from "@/types/menu"
import { useCart } from "@/hooks/use-cart"
import { useBusinessHours } from "@/hooks/use-business-hours"
import { useCategoryScroll } from "@/hooks/use-category-scroll"
import { groupBeverages } from "@/lib/menu"
import type { OrderStep } from "@/types/order"
import { processOrderSubmission } from "@/lib/order"
import { BUSINESS_HOURS } from "@/data/business-hours"
import { useBusinessSettings } from "@/components/providers/business-settings-provider"
import { getPickupSlotsFromSettings } from "@/lib/schedule"

const { menuCategories, bebidas, mojos, comboMeals } = menuData as MenuData

export function useOrderPage() {
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

    // Business Settings (Context)
    const { settings, isOpenNow: dynamicIsOpen, nextOpenText: dynamicNextOpen, isLoading: settingsLoading, productsLastUpdated } = useBusinessSettings()

    // Static fallback
    const { slots: staticSlots, isOpenNow: staticIsOpen, nextOpenText: staticNextOpen } = useBusinessHours(BUSINESS_HOURS)

    // Derived state mixing dynamic and static
    const isOpenNow = settings ? dynamicIsOpen : staticIsOpen
    const nextOpenText = settings ? dynamicNextOpen : staticNextOpen

    const slots = useMemo(() => {
        if (settings?.weekly_schedule) {
            return getPickupSlotsFromSettings(settings.weekly_schedule, settings.prep_time ?? 15)
        }
        return staticSlots
    }, [settings, staticSlots])

    const canOrder = isOpenNow && (settings?.orders_enabled ?? true)

    const [inactiveNames, setInactiveNames] = useState<string[]>([])
    const [inactiveError, setInactiveError] = useState<string | null>(null)

    const hasItems = Object.keys(cart).length > 0
    const bagFee = hasItems ? 0.10 : 0
    const finalTotal = total + bagFee

    const submit = async () => {
        const { errors, message } = await processOrderSubmission({
            name,
            phone,
            pickupTime,
            total: finalTotal,
            cartCount: hasItems ? Object.keys(cart).length : 0,
        }, Object.values(cart))
        setErrors(errors)
        if (errors.length === 0 && message) {
            setToastMessage(message)
            setLastOrder({ name, phone, pickupTime, total: finalTotal })
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

    useEffect(() => {
        setActiveCategory(activeCategoryFromHook)
    }, [activeCategoryFromHook])

    useEffect(() => {
        let mounted = true
        const fetchInactive = async () => {
            try {
                const res = await fetch("https://api.barguantanamera.com/products/inactive-names", {
                    headers: {
                        "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
                    },
                })
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

        return () => {
            mounted = false
        }
    }, [productsLastUpdated])

    return {
        // State
        cart,
        name,
        setName,
        phone,
        setPhone,
        pickupTime,
        setPickupTime,
        errors,
        setErrors,
        step,
        setStep,
        mobileCartOpen,
        setMobileCartOpen,
        activeCategory,
        productsRef,
        toastOpen,
        setToastOpen,
        toastMessage,
        lastOrder,
        inactiveNames,
        inactiveError,
        
        // Settings/Business logic
        isOpenNow,
        nextOpenText,
        slots,
        canOrder,
        settingsLoading,
        
        // Calculated
        total,
        bagFee,
        finalTotal,
        allCategories,
        beveragesByCategory,
        
        // Actions
        addToCart,
        increase,
        decrease,
        removeItem,
        submit,
        scrollToCategory,
        
        // Data
        menuCategories,
        comboMeals,
        mojos,
        bebidas
    }
}
