import { createHmac } from 'crypto'

// SECRETO para firmar tokens (En producción debe estar en .env)
const TOKEN_SECRET = process.env.AUTH_SECRET || 'cambiar-esto-por-un-secreto-real-en-produccion-123456789'
const TOKEN_EXPIRY_HOURS = 24

/**
 * Genera un token de confirmación stateless (firmado)
 * Formato: base64(expiration.email.signature)
 */
export function generateConfirmationToken(userId: string, email: string): string {
    const expiresAt = Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
    const data = `${userId}:${email}:${expiresAt}`

    // Crear firma
    const signature = createHmac('sha256', TOKEN_SECRET)
        .update(data)
        .digest('base64url')

    // El token contiene la data necesaria y la firma para validarlo
    // Usamos base64url para que sea seguro en URLs
    const payload = Buffer.from(data).toString('base64url')

    return `${payload}.${signature}`
}

/**
 * Valida un token stateless
 */
export function validateToken(token: string, email: string): {
    valid: boolean
    error?: string
    userId?: string
} {
    try {
        const [payloadBase64, providedSignature] = token.split('.')

        if (!payloadBase64 || !providedSignature) {
            return { valid: false, error: 'Formato de token inválido' }
        }

        // Decodificar payload
        const data = Buffer.from(payloadBase64, 'base64url').toString()
        const [userId, tokenEmail, expiresAtStr] = data.split(':')

        if (!userId || !tokenEmail || !expiresAtStr) {
            return { valid: false, error: 'Token corrupto' }
        }

        // 1. Verificar Email
        if (tokenEmail !== email) {
            return { valid: false, error: 'El email no coincide con el token' }
        }

        // 2. Verificar Expiración
        const expiresAt = parseInt(expiresAtStr)
        if (Date.now() > expiresAt) {
            return { valid: false, error: 'El token ha expirado' }
        }

        // 3. Verificar Firma (Integridad)
        const expectedSignature = createHmac('sha256', TOKEN_SECRET)
            .update(data)
            .digest('base64url')

        if (expectedSignature !== providedSignature) {
            return { valid: false, error: 'Token inválido o manipulado' }
        }

        return { valid: true, userId }

    } catch (error) {
        return { valid: false, error: 'Error procesando el token' }
    }
}
