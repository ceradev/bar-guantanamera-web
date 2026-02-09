import { NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { OrderConfirmationTemplate } from '@/lib/order-email-template'
import { z } from 'zod'

const orderConfirmationSchema = z.object({
    customerName: z.string().min(1),
    customerEmail: z.string().email(),
    pickupTime: z.string().min(1),
    items: z.array(z.object({
        name: z.string(),
        quantity: z.number(),
    })),
    total: z.number(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const result = orderConfirmationSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: 'Datos inválidos', details: result.error.flatten() },
                { status: 400 }
            )
        }

        const { customerName, customerEmail, pickupTime, items, total } = result.data

        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: customerEmail,
            subject: '¡Tu pedido está confirmado! - Guantanamera',
            react: OrderConfirmationTemplate({
                customerName,
                pickupTime,
                items,
                total,
            }),
        })

        if (error) {
            console.error('Error enviando email de confirmación de pedido:', error)
            return NextResponse.json(
                { error: 'Error al enviar el email de confirmación' },
                { status: 500 }
            )
        }

        console.log('Email de confirmación de pedido enviado:', { emailId: data?.id, to: customerEmail })

        return NextResponse.json({
            success: true,
            message: 'Email de confirmación enviado',
        })
    } catch (error) {
        console.error('Error en order-confirmation:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
