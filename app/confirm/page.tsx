"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

type Status = "loading" | "success" | "error"

export default function ConfirmPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <Suspense fallback={<ConfirmFallback />}>
                <ConfirmContent />
            </Suspense>
        </div>
    )
}

function ConfirmFallback() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-card rounded-2xl border border-border p-8 text-center"
        >
            <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
                Verificando...
            </h1>
            <p className="text-muted-foreground">
                Por favor espera mientras verificamos tu correo electrónico.
            </p>
        </motion.div>
    )
}

function ConfirmContent() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<Status>("loading")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const token = searchParams.get("token")
        const email = searchParams.get("email")

        if (!token || !email) {
            setStatus("error")
            setMessage("Enlace de confirmación inválido. Faltan parámetros.")
            return
        }

        async function confirmEmail() {
            try {
                const response = await fetch("/api/auth/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, email }),
                })

                const data = await response.json()

                if (response.ok) {
                    setStatus("success")
                    setMessage("¡Tu correo electrónico ha sido verificado correctamente!")
                } else {
                    setStatus("error")
                    setMessage(data.error || "Error al verificar el correo")
                }
            } catch (error) {
                setStatus("error")
                setMessage("Error de conexión. Intenta de nuevo más tarde.")
            }
        }

        confirmEmail()
    }, [searchParams])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-card rounded-2xl border border-border p-8 text-center"
        >
            {status === "loading" && (
                <>
                    <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Verificando...
                    </h1>
                    <p className="text-muted-foreground">
                        Por favor espera mientras verificamos tu correo electrónico.
                    </p>
                </>
            )}

            {status === "success" && (
                <>
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        ¡Verificado!
                    </h1>
                    <p className="text-muted-foreground mb-6">{message}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-primary text-white font-semibold rounded-md px-6 py-3 hover:bg-primary/90 transition-colors"
                    >
                        Ir al inicio
                    </Link>
                </>
            )}

            {status === "error" && (
                <>
                    <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Error de verificación
                    </h1>
                    <p className="text-muted-foreground mb-6">{message}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center border-2 border-primary text-primary font-semibold rounded-md px-6 py-3 hover:bg-primary/10 transition-colors"
                    >
                        Volver al inicio
                    </Link>
                </>
            )}
        </motion.div>
    )
}
