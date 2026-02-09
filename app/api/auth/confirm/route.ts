import { NextResponse } from 'next/server'
import { validateToken, invalidateToken } from '@/lib/tokens'
import { z } from 'zod'

const confirmSchema = z.object({
    token: z.string().min(1, 'Token requerido'),
    email: z.string().email('Email inválido'),
})

// Almacén de usuarios verificados (en producción usar base de datos)
const verifiedUsers = new Map<string, {
    emailVerified: boolean
    emailVerifiedAt: Date
}>()

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = confirmSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: result.error.flatten() },
                { status: 400 }
            )
        }

        const { token, email } = result.data

        // Validar token
        const validation = validateToken(token, email)

        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            )
        }

        // Marcar email como verificado
        verifiedUsers.set(validation.userId!, {
            emailVerified: true,
            emailVerifiedAt: new Date(),
        })

        // Invalidar token
        invalidateToken(token)

        console.log('Email verificado:', { userId: validation.userId, email })

        return NextResponse.json({
            success: true,
            message: 'Email verificado correctamente',
            userId: validation.userId,
        })
    } catch (error) {
        console.error('Error en confirm:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}

// Función helper para verificar si un usuario tiene email verificado
export function isEmailVerified(userId: string): boolean {
    const user = verifiedUsers.get(userId)
    return user?.emailVerified ?? false
}
