"use client"

import { useEffect } from "react"
import { notificationService } from "@/services/notification.service"

interface NotificationCallbacks {
    onSettingsUpdated?: () => void
    onProductsUpdated?: () => void
}

export function useNotifications({ onSettingsUpdated, onProductsUpdated }: NotificationCallbacks) {
    useEffect(() => {
        const unsubscribers: Array<() => void> = []

        if (onSettingsUpdated) {
            unsubscribers.push(
                notificationService.subscribe("SETTINGS_UPDATED", () => {
                    onSettingsUpdated()
                })
            )
        }

        if (onProductsUpdated) {
            unsubscribers.push(
                notificationService.subscribe("PRODUCTS_UPDATED", () => {
                    onProductsUpdated()
                })
            )
        }

        return () => {
            unsubscribers.forEach(unsub => unsub())
        }
    }, [onSettingsUpdated, onProductsUpdated])
}

