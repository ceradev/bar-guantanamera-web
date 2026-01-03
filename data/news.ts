import { createElement, type ReactNode } from "react"
import { Calendar, Laptop, Truck } from "lucide-react"
import { z } from "zod"
import newsJson from "@/data/news-data.json"

export type NewsItem = {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  tag: string
  icon?: ReactNode
  cta: string
  detailsImage?: string
}

type IconKey = "calendar" | "laptop" | "truck"

const iconMap: Record<IconKey, ReactNode> = {
  calendar: createElement(Calendar, { className: "w-4 h-4" }),
  laptop: createElement(Laptop, { className: "w-4 h-4" }),
  truck: createElement(Truck, { className: "w-4 h-4" }),
}

const IconKeySchema = z.enum(["calendar", "laptop", "truck"]) 

const NewsJsonItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  image: z.string(),
  tag: z.string(),
  cta: z.string(),
  detailsImage: z.string().optional(),
  iconKey: IconKeySchema.optional(),
})

const NewsJsonSchema = z.object({ newsItems: z.array(NewsJsonItemSchema) })

const parsed = NewsJsonSchema.safeParse(newsJson)

export const newsItems: NewsItem[] = parsed.success
  ? parsed.data.newsItems.map((item) => ({
      ...item,
      icon: item.iconKey ? iconMap[item.iconKey] : undefined,
    }))
  : []
