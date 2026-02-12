"use client"

import { useEffect, useState, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

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
        <CardWrapper>
            <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Verificando...</h1>
            <p className="text-muted-foreground">
                Por favor espera mientras validamos tu enlace.
            </p>
        </CardWrapper>
    )
}

function CardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-card rounded-2xl border border-border p-8 text-center shadow-lg"
        >
            {children}
        </motion.div>
    )
}

function ConfirmContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Estados
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    // Evitar doble ejecución en React Strict Mode
    const verificationAttempted = useRef(false)

    useEffect(() => {
        const token = searchParams.get("token")
        const email = searchParams.get("email")

        // Si ya intentamos verificar o faltan datos, no hacemos nada
        if (verificationAttempted.current) return
        if (!token || !email) {
            setStatus("error")
            setMessage("Enlace incompleto o inválido.")
            return
        }

        const verifyToken = async () => {
            verificationAttempted.current = true
            setStatus("loading")

            try {
                const response = await fetch("/api/auth/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, email }),
                })

                const data = await response.json()

                if (response.ok) {
                    setStatus("success")
                    setMessage("Tu cuenta ha sido verificada correctamente.")
                    // Redirigir automáticamente después de 3 segundos
                    setTimeout(() => router.push("/"), 3000)
                } else {
                    setStatus("error")
                    setMessage(data.error || "El enlace ha expirado o no es válido.")
                }
            } catch (error) {
                setStatus("error")
                setMessage("Error de conexión. Intenta nuevamente.")
                // Permitir reintentar en caso de error de red
                verificationAttempted.current = false
            }
        }

        verifyToken()
    }, [searchParams, router])

    return (
        <CardWrapper>
            {status === "idle" || status === "loading" ? (
                <>
                    <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">Verificando...</h1>
                    <p className="text-muted-foreground">Estamos confirmando tu correo electrónico.</p>
                </>
            ) : status === "success" ? (
                <>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">¡Todo listo!</h1>
                    <p className="text-muted-foreground mb-6">{message}</p>
                    <p className="text-xs text-muted-foreground mb-4">Serás redirigido en unos segundos...</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium rounded-md px-6 py-3 hover:bg-primary/90 transition-colors w-full"
                    >
                        Ir al inicio <ArrowRight className="w-4 h-4" />
                    </Link>
                </>
            ) : (
                <>
                    <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">Algo salió mal</h1>
                    <p className="text-muted-foreground mb-6">{message}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center border-2 border-primary text-primary font-semibold rounded-md px-6 py-3 hover:bg-primary/5 transition-colors w-full"
                    >
                        Volver al inicio
                    </Link>
                </>
            )}
        </CardWrapper>
    )
}
