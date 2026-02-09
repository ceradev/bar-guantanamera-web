import { createElement, type ReactNode } from "react"
import { Calendar, Laptop, Truck, Instagram, Utensils, MessageCircle } from "lucide-react"
import { z } from "zod"
import newsJson from "@/data/news.json"

export type NewsItem = {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  tag: string
  icon?: ReactNode
  cta: string
  link: string
  detailsImage?: string
}

type IconKey = "calendar" | "laptop" | "truck" | "instagram" | "utensils" | "message"

const iconMap: Record<IconKey, ReactNode> = {
  calendar: createElement(Calendar, { className: "w-4 h-4" }),
  laptop: createElement(Laptop, { className: "w-4 h-4" }),
  truck: createElement(Truck, { className: "w-4 h-4" }),
  instagram: createElement(Instagram, { className: "w-4 h-4" }),
  utensils: createElement(Utensils, { className: "w-4 h-4" }),
  message: createElement(MessageCircle, { className: "w-4 h-4" }),
}

const IconKeySchema = z.enum(["calendar", "laptop", "truck", "instagram", "utensils", "message"])

const NewsJsonItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  image: z.string(),
  tag: z.string(),
  cta: z.string(),
  link: z.string(),
  detailsImage: z.string().optional(),
  icon: IconKeySchema.optional(),
})

const NewsJsonSchema = z.array(NewsJsonItemSchema)

const parsed = NewsJsonSchema.safeParse(newsJson)

export const newsItems: NewsItem[] = parsed.success
  ? parsed.data.map((item) => ({
    ...item,
    icon: item.icon ? iconMap[item.icon] : undefined,
  }))
  : []
