import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/pricing"

interface OrderSuccessDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    message: string
    lastOrder: { name: string; phone: string; pickupTime: string; total: number } | null
    onViewOrder: () => void
}

export default function OrderSuccessDialog({
    open,
    onOpenChange,
    message,
    lastOrder,
    onViewOrder
}: OrderSuccessDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg border border-red-200">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 text-center">Pedido confirmado</DialogTitle>
                    <DialogDescription className="text-gray-700 text-center">{message}</DialogDescription>
                </DialogHeader>
                <div className="space-y-2 text-sm">
                    <div>Nombre: <span className="font-semibold">{lastOrder?.name || "—"}</span></div>
                    <div>Teléfono: <span className="font-semibold">{lastOrder?.phone || "—"}</span></div>
                    <div>Hora de recogida: <span className="font-semibold">{lastOrder?.pickupTime || "Sin seleccionar"}</span></div>
                    <div>Total: <span className="font-semibold">{formatPrice(lastOrder?.total ?? 0)}</span></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={onViewOrder}
                    >
                        Ver pedido
                    </Button>
                    <Button asChild variant="outline" className="rounded-full">
                        <Link href="/">
                            Volver a la página principal
                        </Link>
                    </Button>
                    <Button onClick={() => onOpenChange(false)} className="bg-red-600 text-white hover:bg-red-700 rounded-full">
                        Cerrar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
