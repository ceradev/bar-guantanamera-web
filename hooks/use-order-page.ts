"use client"

import { useMemo, useState, useEffect } from "react"
import { useCart } from "@/hooks/use-cart"
import { useBusinessHours } from "@/hooks/use-business-hours"
import type { OrderStep } from "@/types/order"
import { processOrderSubmission } from "@/lib/order"
import { BUSINESS_HOURS } from "@/data/business-hours"
import { useBusinessSettings } from "@/components/providers/business-settings-provider"
import { getPickupSlotsFromSettings } from "@/lib/schedule"

export function useOrderPage() {
    const { cart, increase, decrease, removeItem, total, setCart } = useCart()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [pickupTime, setPickupTime] = useState("")
    const [errors, setErrors] = useState<string[]>([])
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [lastOrder, setLastOrder] = useState<{ name: string; phone: string; pickupTime: string; total: number } | null>(null)

    // Business Settings (Context)
    const { settings, isOpenNow: dynamicIsOpen, nextOpenText: dynamicNextOpen, isLoading: settingsLoading, productsLastUpdated, inactiveNames } = useBusinessSettings()

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

    // const [inactiveNames, setInactiveNames] = useState<string[]>([]) -> Removed
    const inactiveError = null // Kept for compatibility if needed, or remove. Let's keep it null for now or remove if unused. 
    // Actually, inactiveError was used in the UI. We can probably remove it or keep it null.
    // The previous implementation had setInactiveError. 
    // Let's simplifiy and say inactiveError is derived or null.

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
        }
    }

    // Removed useEffect for fetching inactive names

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

        // Actions
        increase,
        decrease,
        removeItem,
        submit,
    }
}
