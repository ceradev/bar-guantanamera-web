import type { CartItem } from "@/types/order"

export type OrderForm = {
  name: string
  email: string
  phone: string
  pickupTime: string
  total: number
  cartCount: number
}

const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/

export function validateOrder(form: OrderForm, items: CartItem[]): string[] {
  const errs: string[] = []
  if (form.cartCount === 0) errs.push("Añade productos al carrito.")
  if (!form.name.trim()) errs.push("Introduce tu nombre.")
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.push("El correo electrónico no es válido.")
  if (!form.pickupTime) errs.push("Selecciona una hora de recogida.")
  if (form.pickupTime && !timeRegex.test(form.pickupTime)) errs.push("La hora de recogida debe tener formato HH:MM.")
  if (form.total > 30 && !form.phone.trim()) errs.push("El teléfono es obligatorio para pedidos mayores de 30€.")
  for (const it of items) {
    if (it.quantity > 20) {
      errs.push(`Cantidad máxima por producto: 20 (${it.name}).`)
      break
    }
  }
  return errs
}

export function buildConfirmationMessage(name: string, pickupTime: string): string {
  const who = name.trim()
  const when = pickupTime
  return `¡Gracias, ${who}! Tu pedido está confirmado para las ${when}.`
}

export async function processOrderSubmission(
  form: OrderForm,
  items: CartItem[]
): Promise<{ errors: string[]; message?: string }> {
  const errors = validateOrder(form, items)
  if (errors.length > 0) {
    return { errors }
  }
  const payload = {
    customerName: form.name.trim(),
    customerEmail: form.email.trim() || undefined,
    pickupTime: form.pickupTime,
    items: items.map(it => ({
      name: it.name,
      quantity: it.quantity,
    })),
    ...(form.phone.trim() ? { customerPhone: form.phone.trim() } : {}),
  }
  try {
    const res = await fetch("https://api.barguantanamera.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
      body: JSON.stringify(payload),
    })
    let respText = ""
    try {
      respText = await res.text()
    } catch { }
    if (res.status === 201) {
      // Enviar email de confirmación si hay email
      if (form.email.trim()) {
        try {
          await fetch('/api/orders/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerName: form.name.trim(),
              customerEmail: form.email.trim(),
              pickupTime: form.pickupTime,
              items: items.map(it => ({ name: it.name, quantity: it.quantity })),
              total: form.total,
            }),
          })
        } catch (emailError) {
          console.error('Error enviando email de confirmación:', emailError)
          // No bloqueamos el pedido si falla el email
        }
      }
      return { errors: [], message: buildConfirmationMessage(form.name, form.pickupTime) }
    }
    let msg = "No se pudo crear el pedido."
    try {
      const data = respText ? JSON.parse(respText) : {}
      if (typeof data?.message === "string") msg = data.message
    } catch { }
    return { errors: [msg] }
  } catch {
    return { errors: ["Error de conexión con el servidor. Inténtalo de nuevo."] }
  }
}
