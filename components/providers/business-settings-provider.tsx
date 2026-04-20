"use client"

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import type { PublicSettings } from '@/types/settings'
import { useNotifications } from '@/hooks/use-notifications'

interface BusinessSettingsContextType {
    settings: PublicSettings | null
    isLoading: boolean
    error: string | null
    isOpenNow: boolean
    nextOpenText: string
    productsLastUpdated: number
    inactiveNames: string[]
    madeToOrderNames: string[]
}

const BusinessSettingsContext = createContext<BusinessSettingsContextType>({
    settings: null,
    isLoading: true,
    error: null,
    isOpenNow: false,
    nextOpenText: "",
    productsLastUpdated: 0,
    inactiveNames: [],
    madeToOrderNames: []
})

export function BusinessSettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<PublicSettings | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [productsLastUpdated, setProductsLastUpdated] = useState<number>(Date.now())
    const [inactiveNames, setInactiveNames] = useState<string[]>([])
    const [madeToOrderNames, setMadeToOrderNames] = useState<string[]>([])

    const fetchSettings = useCallback(async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.barguantanamera.com"
        try {
            // Fetch Settings
            const resSettings = await fetch(`${apiUrl}/api/settings/public/status`, {
                headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "" },
            })
            if (resSettings.ok) {
                const data = await resSettings.json()
                setSettings(data)
                setError(null)
            } else {
                throw new Error("Failed to fetch settings")
            }

            // Fetch Inactive Products
            const resInactive = await fetch(`${apiUrl}/api/products/inactive-names`, {
                headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "" },
            })
            if (resInactive.ok) {
                const data = await resInactive.json()
                const names = Array.isArray(data) ? data : (Array.isArray(data?.names) ? data.names : [])
                setInactiveNames(names)
            }

            // Fetch Made to Order Products
            const resProducts = await fetch(`${apiUrl}/api/products`, {
                headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "" },
            })
            if (resProducts.ok) {
                const data = await resProducts.json()
                const madeToOrderList: string[] = []
                if (Array.isArray(data)) {
                    data.forEach((category: any) => {
                        if (category.products && Array.isArray(category.products)) {
                            category.products.forEach((product: any) => {
                                if (product.madeToOrder === true) {
                                    madeToOrderList.push(product.name)
                                }
                            })
                        }
                    })
                }
                setMadeToOrderNames(madeToOrderList)
            }

        } catch (err) {
            setSettings(prev => {
                if (!prev) setError("No se pudo cargar la configuración")
                return prev
            })
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings, productsLastUpdated]) // Re-fetch when products update

    useNotifications({
        onSettingsUpdated: () => {
            fetchSettings()
        },
        onProductsUpdated: () => {
            setProductsLastUpdated(Date.now())
        },
    })


    // Derived state
    const { isOpenNow, nextOpenText } = useMemo(() => {
        if (!settings?.weekly_schedule?.length) return { isOpenNow: false, nextOpenText: "Horario no disponible" }

        const now = new Date()
        const dayIdx = now.getDay() // 0 = Sunday
        const todaySchedule = settings.weekly_schedule.find(d => d.day === dayIdx)

        let isOpen = false
        if (todaySchedule?.enabled && todaySchedule.open && todaySchedule.close) {
            const [openH, openM] = todaySchedule.open.split(':').map(Number)
            const [closeH, closeM] = todaySchedule.close.split(':').map(Number)

            const openDate = new Date(now)
            openDate.setHours(openH, openM, 0, 0)

            const closeDate = new Date(now)
            closeDate.setHours(closeH, closeM, 0, 0)

            isOpen = now >= openDate && now <= closeDate
        }

        // Calculate nextOpenText
        let text = "Cerrado"
        if (isOpen) {
            text = "Abierto ahora"
        } else {
            // Find next open slot
            // 1. Check if we open later today
            if (todaySchedule?.enabled) {
                const [openH, openM] = todaySchedule.open.split(':').map(Number)
                const openDate = new Date(now)
                openDate.setHours(openH, openM, 0, 0)
                if (now < openDate) {
                    text = `Abrimos hoy a las ${todaySchedule.open}`
                    return { isOpenNow: false, nextOpenText: text }
                }
            }

            // 2. Check upcoming days
            const daysMap = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
            for (let i = 1; i <= 7; i++) {
                const nextDayIdx = (dayIdx + i) % 7
                const nextSchedule = settings.weekly_schedule.find(d => d.day === nextDayIdx)
                if (nextSchedule?.enabled) {
                    text = `Abrimos el ${daysMap[nextDayIdx]} a las ${nextSchedule.open}`
                    return { isOpenNow: false, nextOpenText: text }
                }
            }

            // If no days enabled found
            text = "Cerrado temporalmente"
        }

        return { isOpenNow: isOpen, nextOpenText: text }

    }, [settings])

    return (
        <BusinessSettingsContext.Provider value={{ settings, isLoading, error, isOpenNow, nextOpenText, productsLastUpdated, inactiveNames, madeToOrderNames }}>
            {children}
        </BusinessSettingsContext.Provider>
    )
}

export const useBusinessSettings = () => useContext(BusinessSettingsContext)
