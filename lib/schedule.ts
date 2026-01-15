import type { WeeklyScheduleItem } from "@/types/settings"

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

export function getTodayScheduleFromSettings(schedule: WeeklyScheduleItem[]): DaySchedule | null {
  const today = new Date()
  const dayIdx = today.getDay()
  const entry = schedule.find(d => d.day === dayIdx)
  
  if (!entry || !entry.enabled) return null
  
  const [openH, openM] = entry.open.split(':').map(Number)
  const [closeH, closeM] = entry.close.split(':').map(Number)
  
  const open = new Date(today)
  open.setHours(openH, openM, 0, 0)
  
  const close = new Date(today)
  close.setHours(closeH, closeM, 0, 0)
  
  return { open, close }
}

export function generateSlots(sched: DaySchedule, prepMarginMinutes: number): string[] {
  const stepMinutes = 15
  const start = new Date(sched.open)
  start.setMinutes(start.getMinutes() + Math.max(0, prepMarginMinutes))
  const end = new Date(sched.close)
  // Respect current time: do not allow past slots
  const now = new Date()
  const nowWithMargin = new Date(now)
  nowWithMargin.setMinutes(nowWithMargin.getMinutes() + Math.max(0, prepMarginMinutes))
  // Align now to nearest step boundary (ceil to next step)
  const nowRemainder = nowWithMargin.getMinutes() % stepMinutes
  if (nowRemainder !== 0) {
    nowWithMargin.setMinutes(nowWithMargin.getMinutes() + (stepMinutes - nowRemainder))
  }
  // Use the max between schedule start and current time with margin
  const effectiveStart = nowWithMargin > start ? nowWithMargin : start
  if (end <= effectiveStart) return []
  const slots: string[] = []
  const cursor = new Date(effectiveStart)
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

export function getPickupSlots(businessHours: BusinessHour[], prepMarginMinutes: number): string[] {
  const sched = getTodaySchedule(businessHours)
  if (!sched) return []
  return generateSlots(sched, prepMarginMinutes)
}

export function getPickupSlotsFromSettings(schedule: WeeklyScheduleItem[], prepMarginMinutes: number): string[] {
  const sched = getTodayScheduleFromSettings(schedule)
  if (!sched) return []
  return generateSlots(sched, prepMarginMinutes)
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

export function groupSchedule(schedule: WeeklyScheduleItem[]): BusinessHour[] {
  const groups: Record<string, number[]> = {}
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  
  schedule.forEach(item => {
    const hours = item.enabled ? `${item.open} - ${item.close}` : "Cerrado"
    if (!groups[hours]) groups[hours] = []
    groups[hours].push(item.day)
  })
  
  const result: BusinessHour[] = Object.entries(groups).map(([hours, days]) => {
    const sortedDays = days.sort((a, b) => {
      const da = a === 0 ? 7 : a
      const db = b === 0 ? 7 : b
      return da - db
    })
    
    const labels = sortedDays.map(d => dayNames[d])
    let label = labels.join(", ")
    if (labels.length > 1) {
      const last = labels[labels.length - 1]
      const rest = labels.slice(0, -1).join(", ")
      label = `${rest} y ${last}`
    }
    
    return {
      dayLabel: label,
      hours,
      days: sortedDays
    }
  })
  
  return result.sort((a, b) => {
    const da = a.days[0] === 0 ? 7 : a.days[0]
    const db = b.days[0] === 0 ? 7 : b.days[0]
    return da - db
  })
}
