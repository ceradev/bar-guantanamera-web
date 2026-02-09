import { randomUUID } from 'crypto'

// Token storage (en producción usar base de datos)
interface StoredToken {
    userId: string
    email: string
    token: string
    expiresAt: Date
    used: boolean
    createdAt: Date
}

// In-memory storage (reemplazar con DB en producción)
const tokenStore = new Map<string, StoredToken>()

const TOKEN_EXPIRY_HOURS = 24

/**
 * Genera un token de confirmación único
 */
export function generateConfirmationToken(userId: string, email: string): string {
    const token = randomUUID()
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)

    const storedToken: StoredToken = {
        userId,
        email,
        token,
        expiresAt,
        used: false,
        createdAt: new Date(),
    }

    tokenStore.set(token, storedToken)
    return token
}

/**
 * Valida un token de confirmación
 */
export function validateToken(token: string, email: string): {
    valid: boolean
    error?: string
    userId?: string
} {
    const storedToken = tokenStore.get(token)

    if (!storedToken) {
        return { valid: false, error: 'Token inválido o no encontrado' }
    }

    if (storedToken.email !== email) {
        return { valid: false, error: 'Email no coincide con el token' }
    }

    if (storedToken.used) {
        return { valid: false, error: 'Este token ya ha sido utilizado' }
    }

    if (new Date() > storedToken.expiresAt) {
        return { valid: false, error: 'El token ha expirado' }
    }

    return { valid: true, userId: storedToken.userId }
}

/**
 * Marca un token como usado
 */
export function invalidateToken(token: string): void {
    const storedToken = tokenStore.get(token)
    if (storedToken) {
        storedToken.used = true
    }
}

/**
 * Elimina tokens expirados (llamar periódicamente)
 */
export function cleanupExpiredTokens(): number {
    const now = new Date()
    let cleaned = 0

    tokenStore.forEach((value, key) => {
        if (value.expiresAt < now) {
            tokenStore.delete(key)
            cleaned++
        }
    })

    return cleaned
}
