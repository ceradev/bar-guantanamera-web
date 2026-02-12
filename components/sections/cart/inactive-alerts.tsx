import React from "react"

interface InactiveAlertsProps {
    inactiveError: string | null
    inactiveNames: string[]
}

export default function InactiveAlerts({ inactiveError, inactiveNames }: InactiveAlertsProps) {
    if (!inactiveError && inactiveNames.length === 0) return null

    return (
        <>
            {inactiveError && (
                <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive px-4 py-3 text-sm font-body">
                    {inactiveError}
                </div>
            )}
            {inactiveNames.length > 0 && (
                <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-border bg-secondary px-4 py-3">
                    <div className="text-sm font-semibold text-foreground">Productos temporalmente inactivos</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {inactiveNames.map(n => (
                            <span key={n} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                                {n}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
