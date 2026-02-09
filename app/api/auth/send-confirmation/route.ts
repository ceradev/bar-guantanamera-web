import { NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { generateConfirmationToken } from '@/lib/tokens'
import { ConfirmEmailTemplate } from '@/lib/email-templates'
import { z } from 'zod'

const sendConfirmationSchema = z.object({
    email: z.string().email('Email inválido'),
    userId: z.string().min(1, 'userId requerido'),
    userName: z.string().optional(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = sendConfirmationSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: result.error.flatten() },
                { status: 400 }
            )
        }

        const { email, userId, userName } = result.data

        // Generar token
        const token = generateConfirmationToken(userId, email)

        // Construir URL de confirmación
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const confirmationUrl = `${baseUrl}/confirm?token=${token}&email=${encodeURIComponent(email)}`

        // Enviar email
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Confirma tu correo electrónico - Guantanamera',
            react: ConfirmEmailTemplate({ confirmationUrl, userName }),
        })

        if (error) {
            console.error('Error enviando email:', error)
            return NextResponse.json(
                { error: 'Error al enviar el email de confirmación' },
                { status: 500 }
            )
        }

        console.log('Email de confirmación enviado:', { emailId: data?.id, to: email })

        return NextResponse.json({
            success: true,
            message: 'Email de confirmación enviado',
        })
    } catch (error) {
        console.error('Error en send-confirmation:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
