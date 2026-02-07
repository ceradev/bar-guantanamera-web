"use client"

import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <p className="text-sm text-muted-foreground font-body">
          &copy; 2025 Restaurante Guantanamera. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 text-sm">
          <Link
            href="/politica-de-privacidad"
            className="text-muted-foreground hover:text-primary transition-colors font-body"
          >
            {"Politica de Privacidad"}
          </Link>
          <Link
            href="/terminos-de-servicio"
            className="text-muted-foreground hover:text-primary transition-colors font-body"
          >
            {"Terminos de Servicio"}
          </Link>
        </div>
      </div>
    </footer>
  )
}
