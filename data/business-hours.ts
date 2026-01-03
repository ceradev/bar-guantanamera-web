import type { BusinessHour } from "@/lib/schedule"

export const BUSINESS_HOURS: BusinessHour[] = [
  { dayLabel: "Lunes, Jueves y Viernes", hours: "09:00 - 18:00", days: [1, 4, 5] },
  { dayLabel: "Sábados y Domingos", hours: "09:00 - 17:00", days: [6, 0] },
  { dayLabel: "Martes, Miércoles", hours: "Cerrado", days: [2, 3] },
]

