import { Laptop, Truck, Calendar } from "lucide-react"
import raw from "@/data/news.json"
import { JSX } from "react"

export interface NewsItem {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  tag: string
  icon: JSX.Element
  cta: string
  detailsImage?: string
}

const ICONS: Record<string, JSX.Element> = {
  laptop: <Laptop className="w-4 h-4" />,
  truck: <Truck className="w-4 h-4" />,
  calendar: <Calendar className="w-4 h-4" />,
}

export const newsItems: NewsItem[] = (raw as any[]).map((n) => ({
  ...n,
  icon: ICONS[n.icon] ?? <Laptop className="w-4 h-4" />,
}))

