export type CartItem = {
  name: string
  unitPrice: number
  quantity: number
  image?: string
}

export type OrderStep = 'productos' | 'hora' | 'cliente' | 'confirmacion'

