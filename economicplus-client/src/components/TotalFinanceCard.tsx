"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useConvertToBRL } from "@/hooks/useConvertToBRL"
import { useTotalFinances } from "@/hooks/useTotalFinances"
import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from "lucide-react"
import { useContext } from "react"
import { Spinner } from "./Spinner"

interface TotalValueInfoProps {
  type: "Gastos" | "Ganhos" | "Balanço"
}

export function TotalFinanceCard({ type }: TotalValueInfoProps) {
  const { selectedCategory } = useContext(FinanceContext)
  const { data, error, isLoading, dataUpdatedAt } = useTotalFinances(selectedCategory)

  const value = (
    type === "Gastos"
      ? data && data.totalFinances.expenses * -1
      : type === "Ganhos"
      ? data?.totalFinances.earnings
      : data?.totalFinances.profit
  ) as number

  return (
    <div className="w-full h-24 xl:h-28 flex items-center justify-between px-4 gap-2 bg-gray-900 rounded-2xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl">{type}</h1>
        <span
          className={`whitespace-nowrap text-xl md:text-xl xl:text-2xl 2xl:text-3xl ${
            type === "Gastos" || value < 0 ? "text-red-500" : type === "Ganhos" ? "text-green-500" : "text-yellow-500"
          }`}
          key={dataUpdatedAt}
        >
          {isLoading ? <Spinner /> : error ? <span>Falha ao carregar!</span> : useConvertToBRL(value)}
        </span>
      </div>

      <span
        className={`${
          type === "Gastos" || value < 0 ? "text-red-500" : type === "Ganhos" ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {type === "Gastos" ? (
          <ArrowDownCircle size={55} />
        ) : type === "Ganhos" ? (
          <ArrowUpCircle size={55} />
        ) : (
          <CircleDollarSign size={55} />
        )}
      </span>
    </div>
  )
}
