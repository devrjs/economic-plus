"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Spinner } from "@/components/Spinner"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type UserFormData = {
  name: string
  password: string
  confirmPassword: string
}

export default function ResetPassword() {
  const router = useRouter()
  const token = Cookies.get("token")
  const [isLoading, setIsLoading] = useState(false)

  // ***** validation *****
  const userFormSchema = z
    .object({
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
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<UserFormData> = async data => {
    const { password } = data

    setIsLoading(true)

    try {
      await api.post(
        "/edit/user",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      router.push("/dashboard")
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-[28rem] flex flex-col justify-center gap-6 px-8 pt-6 pb-8 bg-gray-800 rounded-xl">
      <h1 className="text-xl font-semibold">Recuperação de senha</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[350px] flex flex-col gap-3">
        <Input
          type="password"
          placeholder="Nova Senha"
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
          {isLoading ? <Spinner /> : "Confirmar"}
        </Button>
      </form>
    </div>
  )
}
