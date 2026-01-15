"use client"

import React, { createContext, useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react'
import type { PublicSettings } from '@/types/settings'

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
    const lastSettingsFetchRef = useRef<number>(0)

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
            lastSettingsFetchRef.current = Date.now()
        } catch (err) {
            setSettings(prev => {
                if (!prev) setError("No se pudo cargar la configuración")
                return prev
            })
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Initial fetch
    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])

    // Poll notifications (solo si el endpoint existe)
    useEffect(() => {
        let mounted = true
        let stopPolling = false

        const poll = async () => {
            if (stopPolling) return
            try {
                const res = await fetch("https://api.barguantanamera.com/notifications?types=SETTINGS_UPDATED,PRODUCTS_UPDATED", {
                    headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "" }
                })

                if (!mounted) return

                // Si el endpoint no existe (404), desactivar el polling definitivamente
                if (res.status === 404) {
                    stopPolling = true
                    return
                }

                if (res.ok) {
                    const data = await res.json()
                    if (Array.isArray(data)) {
                        const maxSettingsTime = data
                            .filter((n: any) => n.type === "SETTINGS_UPDATED")
                            .reduce((max: number, n: any) => Math.max(max, new Date(n.createdAt).getTime()), 0)

                        if (maxSettingsTime > lastSettingsFetchRef.current) {
                            fetchSettings()
                        }

                        const maxProductsTime = data
                            .filter((n: any) => n.type === "PRODUCTS_UPDATED")
                            .reduce((max: number, n: any) => Math.max(max, new Date(n.createdAt).getTime()), 0)

                        setProductsLastUpdated(prev => {
                            if (maxProductsTime > prev) return maxProductsTime
                            return prev
                        })
                    }
                }
            } catch (e) {
                // Silenciar errores de polling
            }
        }

        // Intervalo más relajado para evitar spam de logs
        const interval = setInterval(poll, 30000)

        return () => {
            mounted = false
            clearInterval(interval)
        }
    }, [fetchSettings])


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
