export function parsePrice(input: string): number {
  if (!input) return 0
  const match = String(input).match(/(\d+[\.,]?\d*)/)
  if (!match) return 0
  const normalized = match[1].replace(',', '.')
  const value = parseFloat(normalized)
  return isNaN(value) ? 0 : value
}

export function formatPrice(n: number): string {
  const fixed = Number.isFinite(n) ? n.toFixed(2) : '0.00'
  return `${fixed}€`
}

