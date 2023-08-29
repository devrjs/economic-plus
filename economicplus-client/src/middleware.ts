import jwtDecode from "jwt-decode"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { User } from "./lib/auth"

const publicRoutes = ["/", "/signup", "/forgot"]

const protectedRoutes = ["/category", "/dashboard", "/finances", "/goals", "/password/reset", "/pendencies", "/profile"]

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  if (!token) {
    if (protectedRoutes.includes(request.nextUrl.pathname) || request.nextUrl.pathname == "/verification") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  } else {
    const { accountStatus } = jwtDecode<User>(token)

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
      if (accountStatus == "unverified") {
        return NextResponse.redirect(new URL("/verification", request.url))
      }
    }

    if (request.nextUrl.pathname == "/verification") {
      if (accountStatus != "unverified") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    if (publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}
