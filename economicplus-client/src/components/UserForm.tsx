"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useUser } from "@/hooks/useUser"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { Lock, Mail, User2 } from "lucide-react"
import { useContext, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { Input } from "./Input"
import { Spinner } from "./Spinner"

type UserFormData = {
  name: string
  password: string
  confirmPassword: string
}

interface UserFormProps {}

export function UserForm({}: UserFormProps) {
  const [message, setMessage] = useState("")
  const { toUpdate, setToUpdate } = useContext(FinanceContext)
  const [noPassword, setNoPassword] = useState(true)
  const [isSaving, setSaving] = useState(false)
  const token = Cookies.get("token")
  const { data, error, isLoading, dataUpdatedAt } = useUser(toUpdate)

  // ***** validation *****
  const userFormSchema = noPassword
    ? z.object({
        name: z.string().min(1, { message: "Nome obrigatório!" }),
      })
    : z
        .object({
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
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<UserFormData> = async data => {
    const { name, password } = data

    setSaving(true)

    try {
      await api.post(
        "/edit/user",
        {
          name,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setMessage("Dados alterados com sucesso!")
      setToUpdate(!toUpdate)
    } catch (error) {
      setMessage("Falha ao atualizar dados!")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[350px] flex flex-col gap-3 mt-6">
      <Input
        type="email"
        defaultValue={data?.user.email}
        placeholder="Seu E-mail"
        icon={<Mail size={22} />}
        bgColor="bg-gray-700"
        autoComplete="off"
        disabled
      />
      <span className="text-red-500"></span>

      <Input
        type="text"
        defaultValue={data?.user.name}
        placeholder="Seu Nome"
        error={errors.name}
        icon={<User2 size={22} />}
        {...register("name")}
        bgColor="bg-gray-700"
        autoComplete="off"
      />
      <span className="text-red-500">{errors.name?.message}</span>

      <Button type="button" onClick={() => setNoPassword(!noPassword)} className="bg-purple-500 hover:bg-purple-400">
        Alterar a senha
      </Button>
      <div className={`${noPassword && "hidden"} flex flex-col gap-3`}>
        <Input
          type="password"
          placeholder="Nova Senha"
          error={errors.password}
          icon={<Lock size={22} />}
          {...register("password")}
          bgColor="bg-gray-700"
          autoComplete="off"
        />
        <span className="text-red-500">{errors.password?.message}</span>

        <Input
          type="password"
          placeholder="Confirme sua senha"
          error={errors.confirmPassword}
          icon={<Lock size={22} />}
          {...register("confirmPassword")}
          bgColor="bg-gray-700"
          autoComplete="off"
        />
        <span className="text-red-500">{errors.confirmPassword?.message}</span>
      </div>

      <Button type="submit" disabled={isLoading} className="mt-4">
        {isSaving ? <Spinner /> : "Alterar dados"}
      </Button>

      <span className={`-mb-2 ${message == "Dados alterados com sucesso!" ? "text-green-500" : "text-red-500"}`}>
        {message}
      </span>
    </form>
  )
}
