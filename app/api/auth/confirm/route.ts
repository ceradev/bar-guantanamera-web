import { NextResponse } from 'next/server'
import { validateToken } from '@/lib/tokens'
import { z } from 'zod'

const confirmSchema = z.object({
    token: z.string().min(1, 'Token requerido'),
    email: z.string().email('Email inválido'),
})

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

        // Validar token (stateless signature check)
        const validation = validateToken(token, email)

        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            )
        }

        // En un sistema real, aquí actualizarías la DB:
        // await db.user.update({ where: { id: validation.userId }, data: { emailVerified: true } })

        console.log('Email verificado (Stateless):', { userId: validation.userId, email })

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
