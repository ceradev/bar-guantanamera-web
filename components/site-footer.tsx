import { Flame } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-2 text-white">
          <Flame className="h-5 w-5 text-red-500" />
          <p className="text-sm font-semibold">Bar Restaurante Guantanamera</p>
        </div>
        <p className="text-center text-sm text-gray-400 sm:text-right">
          © {new Date().getFullYear()} Guantanamera. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
