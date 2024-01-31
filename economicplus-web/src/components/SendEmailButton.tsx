"use client"

import { api } from "@/lib/api"
import { User } from "@/lib/auth"
import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import { Send } from "lucide-react"
import { useEffect, useState } from "react"
import { Spinner } from "./Spinner"

interface SendEmailButtonProps {
  type: "verification" | "password"
}

export function SendEmailButton({ type }: SendEmailButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const token = Cookies.get("token")

  useEffect(() => {
    if (token) {
      const { email } = jwtDecode<User>(token)
      setEmail(email)
    }
  }, [])

  async function sendEmail() {
    setIsLoading(true)

    try {
      type == "verification"
        ? await api.get("/send/email/verification", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        : await api.post("/send/email/forgot", {
            email,
          })

      setMessage("Um e-mail foi enviado! Verifique sua caixa de entrada.")
    } catch (error) {
      setMessage("Erro ao enviar e-mail.")

      return console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-fit flex flex-col gap-2">
      <button
        onClick={() => sendEmail()}
        className="w-44 h-12 flex items-center justify-center gap-2 px-4 rounded bg-blue-600 hover:bg-blue-800 text-gray-100"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Send size={22} />
            <span>Reenviar e-mail</span>
          </>
        )}
      </button>

      {message && (
        <span
          className={`text-md ${
            message == "Um e-mail foi enviado! Verifique sua caixa de entrada." ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </span>
      )}
    </div>
  )
}
