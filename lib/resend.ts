import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY environment variable')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Dominio verificado en Resend: mail.barguantanamera.com
export const FROM_EMAIL = 'Guantanamera <noreply@mail.barguantanamera.com>'
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contacto@mail.barguantanamera.com'
