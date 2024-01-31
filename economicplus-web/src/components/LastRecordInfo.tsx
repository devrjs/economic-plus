"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useConvertToBRL } from "@/hooks/useConvertToBRL"
import { useTotalFinances } from "@/hooks/useTotalFinances"
import { ChevronsDown, ChevronsUp } from "lucide-react"
import { useContext } from "react"
import { Spinner } from "./Spinner"

interface LastRecordInfoProps {
  type: "Gastos" | "Ganhos"
}

export function LastRecordInfo({ type }: LastRecordInfoProps) {
  const { selectedCategory } = useContext(FinanceContext)
  const { data, error, isLoading, dataUpdatedAt } = useTotalFinances(selectedCategory)

  const finances = type == "Gastos" ? data?.totalFinances.latestExpenses : data?.totalFinances.latestEarnings
  const total = type == "Gastos" ? data?.totalFinances.expensesTotalRecords : data?.totalFinances.earningsTotalRecords

  return (
    <div
      className="w-full min-h-[220px] flex flex-col justify-center p-4 gap-2 bg-gray-900 rounded-2xl"
      key={dataUpdatedAt}
    >
      <header className="flex items-center justify-between">
        <h1 className="text-xl">Últimos {type}</h1>
        <span className={`${type === "Gastos" ? "text-red-500" : "text-green-500"}`}>
          {type === "Gastos" ? <ChevronsDown size={35} /> : <ChevronsUp size={35} />}
        </span>
      </header>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center">
          <span>Falha ao carregar!</span>
        </div>
      ) : finances && finances.length > 0 ? (
        finances.map(finance => (
          <div className="w-full whitespace-nowrap flex justify-between px-4 py-1 bg-gray-800 rounded" key={finance.id}>
            <span className="text-ellipsis overflow-hidden" title={finance.description}>
              {finance.description}
            </span>
            <span className={`text-end pl-3 ${type === "Gastos" ? "text-red-500" : "text-green-500"}`}>
              {useConvertToBRL(type == "Gastos" ? finance.amount * -1 : finance.amount)}
            </span>
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center text-gray-600">
          <span className="p-1 rounded-md">Nenhum registro de finança realizado!</span>
        </div>
      )}

      <div className="w-full flex justify-between px-4 py-1 mt-auto text-gray-300 border-t-[1px] border-t-gray-700">
        <span>Total de registros</span>
        <span>{total}</span>
      </div>
    </div>
  )
}
