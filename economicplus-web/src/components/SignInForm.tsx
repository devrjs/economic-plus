"use client"

import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import Cookie from "js-cookie"
import { Lock, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { Input } from "./Input"
import { LogoName } from "./LogoName"
import { Spinner } from "./Spinner"

type SignInFormData = {
  email: string
  password: string
}

export function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [signInErrorMessage, setSignInErrorMessage] = useState("")

  // ***** validation *****
  const signInFormSchema = z.object({
    email: z.string().email({ message: "E-mail obrigatório!" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres!" }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<SignInFormData> = async data => {
    const { email, password } = data

    setIsLoading(true)

    try {
      const res = await api.post("/session", {
        email,
        password,
      })

      const { token } = res.data

      Cookie.set("token", token, { path: "/", expires: 60 * 60 * 24 * 7 })

      router.push("/dashboard")
    } catch (error) {
      if (error && isAxiosError(error)) {
        error.response?.status.toString() == "401"
          ? setSignInErrorMessage("E-mail ou senha incorretos!")
          : setSignInErrorMessage("Erro de conexão com o servidor!")
      }

      return console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xs h-screen sm:h-auto flex flex-col justify-center gap-3 pt-2 pb-8"
    >
      <div className="w-full flex items-center justify-center">
        <LogoName />
      </div>

      <Input type="email" placeholder="E-mail" icon={<Mail size={22} />} error={errors.email} {...register("email")} />
      <span className="text-red-500">{errors.email?.message}</span>

      <Input
        type="password"
        placeholder="Senha"
        error={errors.password}
        icon={<Lock size={22} />}
        {...register("password")}
      />
      <span className="text-red-500">{errors.password?.message}</span>

      <Button type="submit" disabled={isLoading} className="mt-2">
        {isLoading ? <Spinner /> : "Entrar na plataforma"}
      </Button>

      {signInErrorMessage && <span className="text-center text-md text-red-500">{signInErrorMessage}</span>}
    </form>
  )
}
