
"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"

interface CartButtonProps {
    className?: string
    iconSize?: string // e.g., "h-5 w-5" or "h-6 w-6"
}

export function CartButton({ className, iconSize = "h-5 w-5" }: CartButtonProps) {
    const { count } = useCart()

    return (
        <Link
            href="/encargar"
            className={cn("p-2 text-foreground hover:text-primary transition-colors relative", className)}
            title="Carrito"
        >
            <ShoppingBag className={iconSize} />
            {count > 0 && (
                <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                    {count}
                </Badge>
            )}
        </Link>
    )
}
