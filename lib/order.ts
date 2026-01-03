export type OrderForm = {
  name: string
  phone: string
  pickupTime: string
  total: number
  cartCount: number
}

export function validateOrder(form: OrderForm): string[] {
  const errs: string[] = []
  if (form.cartCount === 0) errs.push("Añade productos al carrito.")
  if (!form.name.trim()) errs.push("Introduce tu nombre.")
  if (!form.pickupTime) errs.push("Selecciona una hora de recogida.")
  if (form.total > 30 && !form.phone.trim()) errs.push("El teléfono es obligatorio para pedidos mayores de 30€.")
  return errs
}

export function buildConfirmationMessage(name: string, pickupTime: string): string {
  const who = name.trim()
  const when = pickupTime
  return `¡Gracias, ${who}! Tu pedido está confirmado para las ${when}.`
}

export function processOrderSubmission(form: OrderForm): { errors: string[]; message?: string } {
  const errors = validateOrder(form)
  if (errors.length > 0) {
    return { errors }
  }
  const message = buildConfirmationMessage(form.name, form.pickupTime)
  return { errors: [], message }
}

