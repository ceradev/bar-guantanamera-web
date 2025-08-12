import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: "Bar Restaurante Guantanamera",
  description: "Especialistas en pollos asados, costillas y patatas asadas. El sabor que te hace sentir en casa.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={cn("bg-white font-sans text-gray-800 antialiased", inter.variable)}>{children}</body>
    </html>
  )
}
