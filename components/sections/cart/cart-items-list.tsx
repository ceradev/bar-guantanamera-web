import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"

interface CartItem {
    name: string
    quantity: number
    unitPrice: number
    image?: string
}

interface CartItemsListProps {
    items: CartItem[]
    onIncrease: (name: string) => void
    onDecrease: (name: string) => void
    onRemove: (name: string) => void
}

export function CartItemsList({ items, onIncrease, onDecrease, onRemove }: CartItemsListProps) {
    return (
        <div className="border border-border rounded-xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="bg-muted/50 text-foreground px-6 md:px-8 py-4 hidden md:grid grid-cols-12 gap-6 text-xs font-bold tracking-wide border-b border-border uppercase">
                <div className="col-span-5">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-3 text-center">Cantidad</div>
                <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items */}
            <div className="bg-card divide-y divide-border">
                {items.length === 0 ? (
                    <div className="p-16 text-center">
                        <p className="text-muted-foreground mb-6 text-base">El carrito está vacío</p>
                        <Button asChild size="lg">
                            <Link href="/menu">Ver el menú</Link>
                        </Button>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.name} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group transition-colors hover:bg-muted/5">
                            {/* Product Info */}
                            <div className="md:col-span-5 flex items-center gap-6">
                                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-secondary rounded-lg overflow-hidden border border-border shadow-sm">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                                            Sin foto
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-foreground text-sm md:text-base leading-tight mb-1">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground hidden md:block">
                                        Delicioso y recién hecho
                                    </p>
                                </div>
                            </div>

                            {/* Price (Desktop) */}
                            <div className="md:col-span-2 text-center hidden md:block font-bold text-base text-muted-foreground">
                                {item.unitPrice.toFixed(2)}€
                            </div>

                            {/* Quantity */}
                            <div className="md:col-span-3 flex items-center justify-between md:justify-center gap-4">
                                <span className="md:hidden font-medium text-sm">Cantidad:</span>
                                <div className="flex items-center border border-border rounded-lg bg-background shadow-sm">
                                    <button
                                        onClick={() => onDecrease(item.name)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors text-base"
                                    >
                                        -
                                    </button>
                                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                    <button
                                        onClick={() => onIncrease(item.name)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors text-base"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Total & Action */}
                            <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                                <span className="md:hidden font-bold text-sm">Total:</span>
                                <div className="flex items-center gap-6">
                                    <span className="font-bold text-lg text-primary">
                                        {(item.unitPrice * item.quantity).toFixed(2)}€
                                    </span>
                                    <button
                                        onClick={() => onRemove(item.name)}
                                        className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-destructive/10 rounded-full"
                                        title="Eliminar"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
