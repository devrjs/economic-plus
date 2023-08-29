"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { SetStateAction, useContext, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { InputWithLabel } from "./InputWithLabel"
import { Spinner } from "./Spinner"

type CategoryFormData = {
  description: string
}

interface CategoryFormProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export function CategoryForm({ setIsOpen }: CategoryFormProps) {
  const { toUpdate, setToUpdate, stageCategory } = useContext(FinanceContext)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const token = Cookies.get("token")

  // ***** validation *****
  const categoryFormSchema = z.object({
    description: z.string().min(1, { message: "Descrição obrigatória!" }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<CategoryFormData> = async data => {
    const { description } = data

    setIsLoading(true)

    try {
      if (stageCategory && stageCategory.id) {
        await api.post(
          "/edit/category",
          {
            category_id: stageCategory.id,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } else {
        await api.post(
          "/add/category",
          {
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }

      setToUpdate(!toUpdate)
      setIsOpen(false)
    } catch (error) {
      setErrorMessage("Falha ao cadastar categoria!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-6">
      <span className="-mb-2 text-red-500">{errors.description?.message}</span>
      <InputWithLabel defaultValue={stageCategory?.description} label="Descrição" {...register("description")} />

      <Button type="submit" className="mt-2">
        {isLoading ? <Spinner /> : "Confirmar"}
      </Button>
      <span className="-mb-2 text-red-500">{errorMessage}</span>
    </form>
  )
}
