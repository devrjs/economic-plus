import { api } from "@/lib/api"
import { isAxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const verification_token = searchParams.get("token")

  try {
    const res = await api.post("/email/validate", {
      verification_token,
    })

    const { token } = res.data

    const redirectURL = new URL("/dashboard", request.url)

    const cookieExpiresInSeconds = 60 * 60 * 24 * 7

    return NextResponse.redirect(redirectURL, {
      headers: {
        "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
      },
    })
  } catch (error) {
    if (error && isAxiosError(error)) {
      if (error.response?.status.toString() == "401") {
        return NextResponse.redirect(new URL("/error/401", request.url), {
          headers: {
            "Set-Cookie": `token=; Path=/; max-age=0;`,
          },
        })
      } else {
        return NextResponse.redirect(new URL("/error/400", request.url), {
          headers: {
            "Set-Cookie": `token=; Path=/; max-age=0;`,
          },
        })
      }
    }
  }
}
