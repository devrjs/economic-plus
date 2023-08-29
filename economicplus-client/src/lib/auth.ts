import decode from "jwt-decode"
import { cookies } from "next/headers"

export interface User {
  sub: string
  email: string
  name: string
  accountStatus: string
}

export function getUser(): User {
  const token = cookies().get("token")?.value

  if (!token) {
    throw new Error("Unauthenticated.")
  }

  const user: User = decode(token)

  return user
}
