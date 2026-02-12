
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navLinks } from "@/config/site"

export function MainNav() {
    const pathname = usePathname()

    const isActive = (href: string) => pathname === href

    return (
        <nav className="hidden flex-1 items-center gap-8 md:flex">
            {navLinks.slice(0, 2).map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-sm font-semibold tracking-wide transition-colors duration-200",
                        isActive(link.href)
                            ? "text-primary underline underline-offset-8 decoration-2"
                            : "text-foreground hover:text-primary"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}

export function RightNav() {
    const pathname = usePathname()
    const isActive = (href: string) => pathname === href

    return (
        <>
            {navLinks.slice(2).map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-sm font-semibold tracking-wide transition-colors duration-200",
                        isActive(link.href)
                            ? "text-primary underline underline-offset-8 decoration-2"
                            : "text-foreground hover:text-primary"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </>
    )
}
