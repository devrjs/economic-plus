"use client"

import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { Mail } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { Input } from "./Input"
import { Spinner } from "./Spinner"

type ForgotFormData = {
  email: string
}

export function ForgotForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  // ***** validation *****
  const forgotFormSchema = z.object({
    email: z.string().email({ message: "Digite seu e-mail!" }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<ForgotFormData> = async data => {
    const { email } = data

    setIsLoading(true)

    try {
      await api.post("/send/email/forgot", {
        email,
      })

      setMessage("Um e-mail foi enviado! Verifique sua caixa de entrada.")
    } catch (error) {
      if (error && isAxiosError(error)) {
        error.response?.status.toString() == "404"
          ? setMessage("E-mail não encontrado!")
          : setMessage("Erro de conexão com o servidor!")
      }

      return console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col justify-center gap-2">
      <Input
        type="email"
        placeholder="Seu E-mail"
        error={errors.email}
        icon={<Mail size={22} />}
        {...register("email")}
      />
      <span className="text-red-500">{errors.email?.message}</span>

      <Button type="submit" disabled={isLoading} className="mt-4">
        {isLoading ? <Spinner /> : "Confirmar"}
      </Button>

      {message && (
        <span
          className={`mt-2 text-center text-md ${
            message == "Um e-mail foi enviado! Verifique sua caixa de entrada." ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </span>
      )}
    </form>
  )
}
