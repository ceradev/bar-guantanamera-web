"use client"

import { useCartContext } from "@/components/providers/cart-provider"

export function useCart() {
  const context = useCartContext()
  return {
    cart: context.cart,
    addToCart: context.addToCart,
    increase: context.increase,
    decrease: context.decrease,
    removeItem: context.removeItem,
    total: context.total,
    setCart: (cart: any) => { /* No-op or implement if needed for legacy compatibility, but preferably avoid */ },
    clearCart: context.clearCart,
    count: context.count
  }
}
