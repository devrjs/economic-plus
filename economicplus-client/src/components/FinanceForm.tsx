"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useDateFormatToUTC } from "@/hooks/useDateFormatToUTC"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import ptBr from "dayjs/locale/pt-br"
import Cookies from "js-cookie"
import { SetStateAction, useContext, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./Button"
import { InputWithLabel } from "./InputWithLabel"
import { RadioButton } from "./RadioButton"
import { Spinner } from "./Spinner"

dayjs.locale(ptBr)

export type FinanceFormData = {
  description: string
  amount: number
  date: string
  type: string
}

interface FinanceFormProps {
  type: "finances" | "pendencies"
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export function FinanceForm({ type, setIsOpen }: FinanceFormProps) {
  const { selectedCategory, toUpdate, setToUpdate, stageFinance } = useContext(FinanceContext)
  const [radioButtonValue, setRadioButtonValue] = useState<string | undefined>(stageFinance?.type)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const token = Cookies.get("token")

  // ***** validation *****
  const financeFormSchema = z.object({
    description: z.string().min(1, "Descrição obrigatória!"),
    amount: z
      .string()
      .min(1, "Valor obrigatório!")
      .transform(amount => Number(amount)),
    date: z.string().min(1, "Data obrigatória!"),
    type: z.string().refine(val => val !== "null", "Selecione o tipo movimentação!"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FinanceFormData>({
    resolver: zodResolver(financeFormSchema),
  })

  register("type", { value: radioButtonValue })

  // ***** submit *****
  const onSubmit: SubmitHandler<FinanceFormData> = async data => {
    const { description, amount, date } = data

    setIsLoading(true)

    try {
      if (stageFinance && stageFinance.id) {
        await api.post(
          "/edit/finance",
          {
            finance_id: stageFinance.id,
            description,
            amount,
            date: dayjs(useDateFormatToUTC(date)).format("YYYY-MM-DDT[03]:mm:ss[Z]"),
            category_id: selectedCategory,
            type: radioButtonValue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } else {
        await api.post(
          "/add/finance",
          {
            description,
            amount,
            date: dayjs(useDateFormatToUTC(date)).format("YYYY-MM-DDT[03]:mm:ss[Z]"),
            category_id: selectedCategory,
            type: radioButtonValue,
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
      setErrorMessage("Falha ao cadastar finança!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-6">
      <span className="-mb-2 text-red-500">{errors.description?.message}</span>
      <InputWithLabel defaultValue={stageFinance?.description} label="Descrição" {...register("description")} />

      <span className="-mb-2 text-red-500">{errors.amount?.message}</span>
      <InputWithLabel defaultValue={stageFinance?.amount} label="Valor" {...register("amount")} />

      <span className="-mb-2 text-red-500">{errors.date?.message}</span>
      <InputWithLabel
        defaultValue={stageFinance && dayjs(stageFinance?.date).format("DD/MM/YYYY")}
        label="Data (dd/mm/aaaa)"
        {...register("date")}
      />

      <span className="-mb-2 text-red-500">{errors.type?.message}</span>
      <RadioButton
        type={type}
        radioButtonValue={radioButtonValue}
        setRadioButtonValue={setRadioButtonValue}
        setValue={setValue}
      />

      <Button type="submit" className="mt-2">
        {isLoading ? <Spinner /> : "Confirmar"}
      </Button>
      <span className="-mb-2 text-red-500">{errorMessage}</span>
    </form>
  )
}
