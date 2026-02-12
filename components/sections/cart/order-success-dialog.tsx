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
            <DialogContent className="sm:max-w-lg border border-primary/20">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground text-center">Pedido confirmado</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-center font-body">{message}</DialogDescription>
                </DialogHeader>
                <div className="space-y-2 text-sm font-body">
                    <div className="text-muted-foreground">Nombre: <span className="font-semibold text-foreground">{lastOrder?.name || "\u2014"}</span></div>
                    <div className="text-muted-foreground">{"Telefono: "}<span className="font-semibold text-foreground">{lastOrder?.phone || "\u2014"}</span></div>
                    <div className="text-muted-foreground">Hora de recogida: <span className="font-semibold text-foreground">{lastOrder?.pickupTime || "Sin seleccionar"}</span></div>
                    <div className="text-muted-foreground">Total: <span className="font-semibold text-foreground">{formatPrice(lastOrder?.total ?? 0)}</span></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <Button
                        variant="outline"
                        className="rounded-sm border-border"
                        onClick={onViewOrder}
                    >
                        Ver pedido
                    </Button>
                    <Button asChild variant="outline" className="rounded-sm border-border">
                        <Link href="/">
                            {"Volver a la pagina principal"}
                        </Link>
                    </Button>
                    <Button onClick={() => onOpenChange(false)} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm">
                        Cerrar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
