import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Bar Cafeteria Guantanamera",
  description:
    "Comida para llevar, para compartir y para disfrutar en familia. Especialidad en pollos, costillas y patas asadas con la receta casera que nos define.",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={cn(
          "bg-white font-sans text-gray-800 antialiased",
          inter.variable
        )}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
