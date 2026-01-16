import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export default function OrderHero() {
    return (
        <div className="text-center mb-10 md:mb-12">
            <Badge className="bg-red-600 hover:bg-red-700 text-white mb-4 px-4 py-1 text-sm uppercase tracking-wider">
                <ShoppingCart className="inline-block mr-2 w-4 h-4" />
                Pedido para llevar
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Encarga tu <span className="text-red-600">pedido</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">
                Elige tus platos, selecciona la hora de recogida y confirma tus datos.
                Pago y recogida en el local, fácil y rápido.
            </p>
        </div>
    )
}
