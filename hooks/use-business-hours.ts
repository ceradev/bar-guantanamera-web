"use client"

import { useMemo } from "react"
import type { BusinessHour } from "@/lib/schedule"
import { getPickupSlots, getTodaySchedule } from "@/lib/schedule"

export function useBusinessHours(businessHours: BusinessHour[]) {
  const slots = useMemo(() => getPickupSlots(businessHours, 15), [businessHours])

  const isOpenNow = useMemo(() => {
    const schedule = getTodaySchedule(businessHours)
    if (!schedule) return false
    const now = new Date()
    return now >= schedule.open && now <= schedule.close
  }, [businessHours])

  const nextOpenText = useMemo(() => {
    const names = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const today = new Date()
    const schedule = getTodaySchedule(businessHours)
    if (schedule) {
      const now = new Date()
      if (now < schedule.open) {
        const h = String(schedule.open.getHours()).padStart(2, "0")
        const m = String(schedule.open.getMinutes()).padStart(2, "0")
        return `Abrimos hoy a las ${h}:${m}`
      }
    }
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() + i)
      const idx = d.getDay()
      const next = businessHours.find(b => b.days.includes(idx) && b.hours !== "Cerrado")
      if (next) {
        const [openStr] = next.hours.split(" - ")
        return `Estamos cerrados. Volvemos ${i === 1 ? "mañana" : `el ${names[idx]}`} a las ${openStr}`
      }
    }
    return "Estamos cerrados."
  }, [businessHours])

  return { slots, isOpenNow, nextOpenText }
}

