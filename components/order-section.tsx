import { Button } from "@/components/ui/button"
import { Phone, ShoppingBag, Bike } from "lucide-react"
import Link from "next/link"

export default function OrderSection() {
  return (
    <section id="pedir" className="w-full scroll-mt-16 bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">¿Hambre? ¡Pide Ahora!</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Elige tu plataforma preferida o llámanos directamente. ¡Te lo llevamos a casa!
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-center text-xl font-semibold text-black">Pide por App</h3>
              <Button size="lg" className="h-14 w-full bg-black text-white hover:bg-gray-800" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Pedir en Uber Eats
                </Link>
              </Button>
              <Button size="lg" className="h-14 w-full bg-black text-white hover:bg-gray-800" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Bike className="mr-2 h-5 w-5" /> Pedir en Glovo
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-center text-xl font-semibold text-black">Pedido Directo</h3>
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <p className="font-semibold text-black">Pedidos por la web</p>
                <p className="text-lg font-bold text-red-600">¡PRÓXIMAMENTE!</p>
                <p className="text-sm text-gray-600">Estamos trabajando para que pidas directamente desde aquí.</p>
              </div>
              <div className="text-center">
                <p className="text-gray-700">O llámanos:</p>
                <a
                  href="tel:912345678"
                  className="mt-1 inline-block text-2xl font-bold text-black hover:text-red-600 sm:text-3xl"
                >
                  <Phone className="mr-2 inline-block h-6 w-6" />
                  912 345 678
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
