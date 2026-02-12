import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export default function OrderHero() {
    return (
        <div className="text-center mb-10 md:mb-12">
            <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground mb-4 px-4 py-1 text-sm uppercase tracking-wider">
                <ShoppingCart className="inline-block mr-2 w-4 h-4" />
                Pedido para llevar
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Encarga tu <span className="text-primary">pedido</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-lg leading-relaxed">
                Elige tus platos, selecciona la hora de recogida y confirma tus datos.
                Pago y recogida en el local, facil y rapido.
            </p>
        </div>
    )
}
