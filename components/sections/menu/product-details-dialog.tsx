"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { MenuItem } from "@/types/menu"
import { CartItem } from "@/types/order"

interface ProductDetailsDialogProps {
    item: (MenuItem & { category?: string }) | null
    open: boolean
    onOpenChange: (open: boolean) => void
    addToCart: (item: MenuItem | CartItem) => void
}

export default function ProductDetailsDialog({ item, open, onOpenChange, addToCart }: ProductDetailsDialogProps) {
    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card border-border">
                <div className="relative aspect-video w-full bg-secondary">
                    {item.image ? (
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 600px) 100vw, 600px"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <ShoppingCart className="h-12 w-12 opacity-20" />
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-bold text-foreground flex justify-between items-start gap-4">
                            <span>{item.name}</span>
                            <span className="text-primary whitespace-nowrap">{item.price}</span>
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground text-base">
                            {item.category}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <p className="text-foreground/80 leading-relaxed font-body">
                            {item.description || "Delicioso plato preparado con ingredientes frescos y de alta calidad. Perfecto para disfrutar en cualquier momento."}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {item.popular && (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full dark:bg-yellow-900/30 dark:text-yellow-500">
                                    Popular
                                </span>
                            )}
                            {item.spicy && (
                                <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full dark:bg-red-900/30 dark:text-red-500">
                                    Picante
                                </span>
                            )}
                            {item.vegetarian && (
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full dark:bg-green-900/30 dark:text-green-500">
                                    Vegetariano
                                </span>
                            )}
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button
                                onClick={() => {
                                    addToCart(item)
                                    onOpenChange(false)
                                }}
                                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Añadir al pedido
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
