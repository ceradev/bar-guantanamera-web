"use client"

import { useMemo, useState } from "react"
import type { MenuItem } from "@/types/menu"
import type { CartItem } from "@/types/order"
import { parsePrice } from "@/lib/pricing"

export function useCart() {
  const [cart, setCart] = useState<Record<string, CartItem>>({})

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

  const total = useMemo(() => {
    return Object.values(cart).reduce((sum, it) => sum + it.unitPrice * it.quantity, 0)
  }, [cart])

  return { cart, addToCart, increase, decrease, removeItem, total, setCart }
}

