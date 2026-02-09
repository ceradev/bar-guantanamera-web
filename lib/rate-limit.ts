// Rate limiting simple por IP (en producción usar Redis)

interface RateLimitEntry {
    count: number
    resetAt: Date
}

const rateLimitStore = new Map<string, RateLimitEntry>()

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5

/**
 * Verifica si una IP está rate limited
 * @returns true si la request está permitida, false si está bloqueada
 */
export function checkRateLimit(ip: string): {
    allowed: boolean
    remaining: number
    resetIn: number
} {
    const now = Date.now()
    const entry = rateLimitStore.get(ip)

    // Si no hay entrada o expiró, crear nueva
    if (!entry || now > entry.resetAt.getTime()) {
        rateLimitStore.set(ip, {
            count: 1,
            resetAt: new Date(now + RATE_LIMIT_WINDOW_MS),
        })
        return {
            allowed: true,
            remaining: MAX_REQUESTS_PER_WINDOW - 1,
            resetIn: RATE_LIMIT_WINDOW_MS,
        }
    }

    // Incrementar contador
    entry.count++

    if (entry.count > MAX_REQUESTS_PER_WINDOW) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetAt.getTime() - now,
        }
    }

    return {
        allowed: true,
        remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
        resetIn: entry.resetAt.getTime() - now,
    }
}

/**
 * Limpia entradas expiradas
 */
export function cleanupRateLimits(): number {
    const now = Date.now()
    let cleaned = 0

    rateLimitStore.forEach((value, key) => {
        if (now > value.resetAt.getTime()) {
            rateLimitStore.delete(key)
            cleaned++
        }
    })

    return cleaned
}
