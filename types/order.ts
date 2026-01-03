export type CartItem = {
  name: string
  unitPrice: number
  quantity: number
}

export type OrderStep = 'productos' | 'hora' | 'cliente' | 'confirmacion'

