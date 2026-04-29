export type CartItem = {
  id?: string
  name: string
  unitPrice: number
  quantity: number
  image?: string
  description?: string
  selectedOptions?: Record<string, string>
}

export type OrderStep = 'productos' | 'hora' | 'cliente' | 'confirmacion'

