import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const isProtected = request.nextUrl.pathname.startsWith("/protected")

  if (!isProtected) {
    return NextResponse.next()
  }

  const session = request.cookies.get("app_session")?.value

  if (!session) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/protected/:path*"],
}
