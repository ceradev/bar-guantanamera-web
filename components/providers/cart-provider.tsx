"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { CartItem } from "@/types/order"
import { MenuItem } from "@/types/menu"
import { parsePrice } from "@/lib/pricing"
import { toast } from "sonner"

interface CartContextType {
    cart: Record<string, CartItem>
    addToCart: (item: MenuItem | CartItem) => void
    increase: (name: string) => void
    decrease: (name: string) => void
    removeItem: (name: string) => void
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

    const addToCart = (item: MenuItem | CartItem) => {
        let price: number
        let image: string | undefined

        if ("price" in item) {
            // It's a MenuItem
            price = parsePrice(item.price)
            image = item.image
        } else {
            // It's a CartItem
            price = item.unitPrice
            image = item.image
        }

        setCart(prev => {
            const existing = prev[item.name]
            const nextQty = existing ? existing.quantity + 1 : 1
            return {
                ...prev,
                [item.name]: {
                    name: item.name,
                    unitPrice: price,
                    quantity: nextQty,
                    image: existing?.image || image
                }
            }
        })

        toast.success(`Añadido: ${item.name}`)
    }

    const increase = (name: string) => {
        setCart(prev => {
            const current = prev[name]
            if (!current) return prev
            return { ...prev, [name]: { ...current, quantity: current.quantity + 1 } }
        })
    }

    const decrease = (name: string) => {
        setCart(prev => {
            const current = prev[name]
            if (!current) return prev
            const nextQty = current.quantity - 1
            if (nextQty <= 0) {
                const { [name]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [name]: { ...current, quantity: nextQty } }
        })
    }

    const removeItem = (name: string) => {
        setCart(prev => {
            const { [name]: _, ...rest } = prev
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
