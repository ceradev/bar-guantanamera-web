export type BusinessHour = {
  dayLabel: string
  hours: string
  days: number[]
}

export type DaySchedule = {
  open: Date
  close: Date
}

function parseHourMinute(hm: string): { h: number; m: number } | null {
  const m = hm.match(/^(\d{1,2}):(\d{2})$/)
  if (!m) return null
  const h = parseInt(m[1], 10)
  const min = parseInt(m[2], 10)
  if (isNaN(h) || isNaN(min)) return null
  return { h, m: min }
}

export function getTodaySchedule(businessHours: BusinessHour[]): DaySchedule | null {
  const today = new Date()
  const dayIdx = today.getDay()
  const entry = businessHours.find(b => b.days.includes(dayIdx))
  if (!entry || entry.hours.toLowerCase() === 'cerrado') return null
  const [openStr, closeStr] = entry.hours.split(' - ')
  const openHM = parseHourMinute(openStr)
  const closeHM = parseHourMinute(closeStr)
  if (!openHM || !closeHM) return null
  const open = new Date(today)
  open.setHours(openHM.h, openHM.m, 0, 0)
  const close = new Date(today)
  close.setHours(closeHM.h, closeHM.m, 0, 0)
  return { open, close }
}

export function getPickupSlots(businessHours: BusinessHour[], prepMarginMinutes: number): string[] {
  const sched = getTodaySchedule(businessHours)
  if (!sched) return []
  const stepMinutes = 15
  const start = new Date(sched.open)
  start.setMinutes(start.getMinutes() + Math.max(0, prepMarginMinutes))
  const end = new Date(sched.close)
  end.setMinutes(end.getMinutes() - Math.max(0, prepMarginMinutes))
  if (end <= start) return []
  const slots: string[] = []
  const cursor = new Date(start)
  // Align cursor to nearest step boundary
  const remainder = cursor.getMinutes() % stepMinutes
  if (remainder !== 0) cursor.setMinutes(cursor.getMinutes() + (stepMinutes - remainder))
  while (cursor <= end) {
    const h = String(cursor.getHours()).padStart(2, '0')
    const m = String(cursor.getMinutes()).padStart(2, '0')
    slots.push(`${h}:${m}`)
    cursor.setMinutes(cursor.getMinutes() + stepMinutes)
  }
  return slots
}

export function isToday(entry: BusinessHour, date: Date = new Date()): boolean {
  return entry.days.includes(date.getDay())
}

export function isClosed(entry: BusinessHour): boolean {
  return entry.hours.toLowerCase() === 'cerrado'
}

export function getBadge(entry: BusinessHour, date: Date = new Date()): 'Hoy' | 'Cerrado' | null {
  if (!isToday(entry, date)) return null
  return isClosed(entry) ? 'Cerrado' : 'Hoy'
}
