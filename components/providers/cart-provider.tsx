"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { CartItem } from "@/types/order"
import { MenuItem } from "@/types/menu"
import { parsePrice } from "@/lib/pricing"
import { toast } from "sonner"

interface CartContextType {
    cart: Record<string, CartItem>
    addToCart: (item: MenuItem | CartItem, selectedOptions?: Record<string, string>) => void
    increase: (key: string) => void
    decrease: (key: string) => void
    removeItem: (key: string) => void
    clearCart: () => void
    total: number
    count: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Record<string, CartItem>>({})
    const [isInitialized, setIsInitialized] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("guantanamera-cart")
        if (saved) {
            try {
                setCart(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse cart from local storage")
            }
        }
        setIsInitialized(true)
    }, [])

    // Save to localStorage whenever cart changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("guantanamera-cart", JSON.stringify(cart))
        }
    }, [cart, isInitialized])

    const addToCart = (item: MenuItem | CartItem, selectedOptions?: Record<string, string>) => {
        let price: number
        let image: string | undefined
        let description: string | undefined

        if ("price" in item) {
            // It's a MenuItem
            price = parsePrice(item.price)
            image = item.image
            description = item.description
        } else {
            // It's a CartItem
            price = item.unitPrice
            image = item.image
            description = item.description
        }

        const finalOptions = selectedOptions || (("selectedOptions" in item) ? item.selectedOptions : undefined)
        
        // Generate key from name + all options
        let cartKey = item.name
        if (finalOptions) {
            const sortedOptions = Object.values(finalOptions).sort()
            if (sortedOptions.length > 0) {
                cartKey = `${item.name} - ${sortedOptions.join(", ")}`
            }
        }

        setCart(prev => {
            const existing = prev[cartKey]
            const nextQty = existing ? existing.quantity + 1 : 1
            return {
                ...prev,
                [cartKey]: {
                    id: cartKey,
                    name: item.name,
                    unitPrice: price,
                    quantity: nextQty,
                    image: existing?.image || image,
                    description: existing?.description || description,
                    selectedOptions: finalOptions
                }
            }
        })

        const optionsText = finalOptions ? Object.values(finalOptions).join(", ") : ""
        toast.success(`Añadido: ${item.name}${optionsText ? ` (${optionsText})` : ""}`)
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

    const clearCart = () => {
        setCart({})
    }

    const total = Object.values(cart).reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, increase, decrease, removeItem, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCartContext must be used within a CartProvider")
    }
    return context
}
