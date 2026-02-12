import { AlertCircle } from "lucide-react"

interface StoreStatusAlertsProps {
    isOpenNow: boolean
    nextOpenText: string | null
    canOrder: boolean
    inactiveError: string | null
}

export function StoreStatusAlerts({
    isOpenNow,
    nextOpenText,
    canOrder,
    inactiveError,
}: StoreStatusAlertsProps) {
    if (canOrder && !inactiveError) return null

    return (
        <div className="mb-8 space-y-4">
            {!canOrder && (
                <div className="p-4 bg-secondary/50 border border-border rounded-lg text-center">
                    <h3 className="text-lg font-bold text-primary mb-2">
                        {!isOpenNow ? "Establecimiento Cerrado" : "Pedidos no disponibles"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        {!isOpenNow
                            ? (nextOpenText || "Vuelve a intentarlo dentro del horario comercial.")
                            : "En este momento no podemos aceptar pedidos desde la web."}
                    </p>
                </div>
            )}

            {inactiveError && (
                <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">{inactiveError}</p>
                </div>
            )}
        </div>
    )
}
