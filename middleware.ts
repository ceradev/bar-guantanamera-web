import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_FILE = /\.[^/]+$/
const TECHNICAL_ROUTES = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/site.webmanifest",
])

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  if (
    pathname === "/mantenimiento" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    TECHNICAL_ROUTES.has(pathname) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const maintenanceUrl = request.nextUrl.clone()
  maintenanceUrl.pathname = "/mantenimiento"

  return NextResponse.rewrite(maintenanceUrl)
}

export const config = {
  matcher: "/:path*",
}
