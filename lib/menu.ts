export function groupBeverages(beverages: any[]): Record<string, any[]> {
  const groups: Record<string, any[]> = {}
  beverages.forEach((b: any) => {
    const key = (b.category || 'otros') as string
    if (!groups[key]) groups[key] = []
    groups[key].push(b)
  })
  return groups
}

