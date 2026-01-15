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
}

const BusinessSettingsContext = createContext<BusinessSettingsContextType>({
    settings: null,
    isLoading: true,
    error: null,
    isOpenNow: false,
    nextOpenText: "",
    productsLastUpdated: 0
})

export function BusinessSettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<PublicSettings | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [productsLastUpdated, setProductsLastUpdated] = useState<number>(Date.now())

    const fetchSettings = useCallback(async () => {
        try {
            const res = await fetch("https://api.barguantanamera.com/settings/public/status", {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
                },
            })

            if (!res.ok) throw new Error("Failed to fetch settings")

            const data = await res.json()
            setSettings(data)
            setError(null)
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
    }, [fetchSettings])

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
        <BusinessSettingsContext.Provider value={{ settings, isLoading, error, isOpenNow, nextOpenText, productsLastUpdated }}>
            {children}
        </BusinessSettingsContext.Provider>
    )
}

export const useBusinessSettings = () => useContext(BusinessSettingsContext)
