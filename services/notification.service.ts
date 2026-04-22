export type NotificationType = "SETTINGS_UPDATED" | "PRODUCTS_UPDATED" | "CONNECTED"

type NotificationHandler = (data: any) => void

class NotificationService {
    private eventSource: EventSource | null = null
    private listeners: Map<NotificationType, Set<NotificationHandler>> = new Map()
    private isConnecting = false
    private readonly retryDelaysMs = [2000, 5000, 10000]
    private reconnectAttempts = 0

    constructor() {
        this.listeners.set("SETTINGS_UPDATED", new Set())
        this.listeners.set("PRODUCTS_UPDATED", new Set())
        this.listeners.set("CONNECTED", new Set())
    }

    private ensureConnection() {
        if (this.eventSource || this.isConnecting) return

        this.isConnecting = true
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.barguantanamera.com"
        const url = new URL(`${apiUrl}/api/notifications/public`)
        url.searchParams.append("types", "SETTINGS_UPDATED,PRODUCTS_UPDATED")

        this.eventSource = new EventSource(url.toString())

        this.eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                const handlers = this.listeners.get(data.type as NotificationType)
                if (handlers) {
                    handlers.forEach(handler => handler(data))
                }
            } catch {
            }
        }

        this.eventSource.onopen = () => {
            this.isConnecting = false
            this.reconnectAttempts = 0
            const handlers = this.listeners.get("CONNECTED")
            if (handlers) {
                handlers.forEach(handler => handler({ type: "CONNECTED" }))
            }
        }

        this.eventSource.onerror = () => {
            this.isConnecting = false
            this.eventSource?.close()
            this.eventSource = null
            const delayIndex = Math.min(this.reconnectAttempts, this.retryDelaysMs.length - 1)
            const delay = this.retryDelaysMs[delayIndex]
            this.reconnectAttempts += 1
            setTimeout(() => this.ensureConnection(), delay)
        }
    }

    subscribe(type: NotificationType, handler: NotificationHandler) {
        const set = this.listeners.get(type)
        if (set) {
            set.add(handler)
        }

        this.ensureConnection()

        return () => {
            const current = this.listeners.get(type)
            if (current) {
                current.delete(handler)
            }
        }
    }
}

export const notificationService = new NotificationService()

