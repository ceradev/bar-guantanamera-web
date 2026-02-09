import { NextResponse, NextRequest } from 'next/server'
import { resend, FROM_EMAIL, CONTACT_EMAIL } from '@/lib/resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { ContactInternalTemplate, ContactUserTemplate } from '@/lib/email-templates'
import { z } from 'zod'

const contactSchema = z.object({
    name: z.string().min(2, 'Nombre muy corto').max(100, 'Nombre muy largo'),
    email: z.string().email('Email inválido'),
    message: z.string().min(10, 'Mensaje muy corto').max(2000, 'Mensaje muy largo'),
})

// Sanitización básica de texto
function sanitize(text: string): string {
    return text
        .replace(/[<>]/g, '') // Eliminar tags HTML básicos
        .trim()
}

export async function POST(request: NextRequest) {
    try {
        // Obtener IP para rate limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown'

        // Verificar rate limit
        const rateLimit = checkRateLimit(ip)
        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.',
                    retryAfter: Math.ceil(rateLimit.resetIn / 1000),
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
                        'X-RateLimit-Remaining': '0',
                    },
                }
            )
        }

        const body = await request.json()
        const result = contactSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: result.error.flatten() },
                { status: 400 }
            )
        }

        const { name, email, message } = result.data

        // Sanitizar inputs
        const sanitizedName = sanitize(name)
        const sanitizedMessage = sanitize(message)
        const sentAt = new Date().toLocaleString('es-ES', {
            dateStyle: 'full',
            timeStyle: 'short',
        })

        // Enviar email interno (al negocio)
        const internalResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: CONTACT_EMAIL,
            replyTo: email,
            subject: `[Contacto Web] Mensaje de ${sanitizedName}`,
            react: ContactInternalTemplate({
                name: sanitizedName,
                email,
                message: sanitizedMessage,
                sentAt,
            }),
        })

        if (internalResult.error) {
            console.error('Error enviando email interno:', internalResult.error)
            return NextResponse.json(
                { error: 'Error al procesar tu mensaje' },
                { status: 500 }
            )
        }

        // Enviar confirmación al usuario
        const userResult = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Hemos recibido tu mensaje - Guantanamera',
            react: ContactUserTemplate({
                name: sanitizedName,
                message: sanitizedMessage,
            }),
        })

        if (userResult.error) {
            console.error('Error enviando email de confirmación al usuario:', userResult.error)
            // No fallamos aquí, el mensaje principal ya se envió
        }

        console.log('Mensaje de contacto procesado:', {
            internalEmailId: internalResult.data?.id,
            userEmailId: userResult.data?.id,
            from: email,
        })

        return NextResponse.json(
            {
                success: true,
                message: 'Mensaje enviado correctamente',
            },
            {
                headers: {
                    'X-RateLimit-Remaining': String(rateLimit.remaining),
                },
            }
        )
    } catch (error) {
        console.error('Error en contact:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
