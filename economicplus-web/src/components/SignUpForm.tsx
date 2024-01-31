"use client"

import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import Cookie from "js-cookie"
import { Lock, Mail, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { Input } from "./Input"
import { Spinner } from "./Spinner"

type SignUpFormData = {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("")

  // ***** validation *****
  const signUpFormSchema = z
    .object({
      email: z.string().email({ message: "E-mail obrigatório!" }),
      name: z.string().min(1, { message: "Nome obrigatório!" }),
      password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres!" }),
      confirmPassword: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres!" }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "As senhas não correspondem",
      path: ["confirmPassword"],
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<SignUpFormData> = async data => {
    const { email, name, password } = data

    setIsLoading(true)

    try {
      const res = await api.post("/signup", {
        email,
        name,
        password,
      })

      const { token } = res.data

      Cookie.set("token", token, { path: "/", expires: 60 * 60 * 24 * 7 })

      router.push("/verification")
    } catch (error) {
      if (error && isAxiosError(error)) {
        error.response?.status.toString() == "400"
          ? setSignUpErrorMessage("Este e-mail já está cadastrado em nosso sistema.")
          : setSignUpErrorMessage("Erro de conexão com o servidor!")
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

      <Input type="text" placeholder="Seu Nome" error={errors.name} icon={<User2 size={22} />} {...register("name")} />
      <span className="text-red-500">{errors.name?.message}</span>

      <Input
        type="password"
        placeholder="Sua Senha"
        error={errors.password}
        icon={<Lock size={22} />}
        {...register("password")}
      />
      <span className="text-red-500">{errors.password?.message}</span>

      <Input
        type="password"
        placeholder="Confirme sua senha"
        error={errors.confirmPassword}
        icon={<Lock size={22} />}
        {...register("confirmPassword")}
      />
      <span className="text-red-500">{errors.confirmPassword?.message}</span>

      <Button type="submit" disabled={isLoading} className="mt-4">
        {isLoading ? <Spinner /> : "Cadastrar"}
      </Button>

      {signUpErrorMessage && <span className="mt-2 text-center text-md text-red-500">{signUpErrorMessage}</span>}
    </form>
  )
}
