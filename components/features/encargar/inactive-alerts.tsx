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
                <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                    {inactiveError}
                </div>
            )}
            {inactiveNames.length > 0 && (
                <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
                    <div className="text-sm font-semibold text-yellow-800">Productos temporalmente inactivos</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {inactiveNames.map(n => (
                            <span key={n} className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                                {n}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
