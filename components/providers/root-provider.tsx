"use client"

import { BusinessSettingsProvider } from "@/components/providers/business-settings-provider"
import { CartProvider } from "@/components/providers/cart-provider"

interface RootProviderProps {
    children: React.ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
    return (
        <BusinessSettingsProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </BusinessSettingsProvider>
    )
}
