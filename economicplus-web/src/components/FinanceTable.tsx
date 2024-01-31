"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useConvertToBRL } from "@/hooks/useConvertToBRL"
import { useFinances } from "@/hooks/useFinances"
import { usePendencies } from "@/hooks/usePendencies"
import dayjs from "dayjs"
import { useContext, useState } from "react"
import { DropdownMenu } from "./DropdownMenu"
import { Pagination } from "./Pagination"
import { Search } from "./Search"
import { Spinner } from "./Spinner"

interface FinanceTableProps {
  type: "finances" | "pendencies"
}

export function FinanceTable({ type }: FinanceTableProps) {
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const { selectedCategory, toUpdate } = useContext(FinanceContext)

  const dataProvider = () =>
    type == "finances"
      ? useFinances(page, searchValue, selectedCategory, toUpdate)
      : usePendencies(page, searchValue, selectedCategory, toUpdate)

  const { data, error, isLoading, dataUpdatedAt } = dataProvider()

  return (
    <div className="w-full h-full flex flex-col gap-2 px-2 pt-4 pb-2 overflow-y-hidden">
      <Search setSearchValue={setSearchValue} />

      <div className="w-full h-full flex flex-col">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center">
            <span>Falha ao carregar!</span>
          </div>
        ) : data && data?.finances.length <= 0 ? (
          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
            <span className="p-8 border border-gray-800 rounded-full">Nenhum registro cadastrado!</span>
          </div>
        ) : (
          <table className="w-full border-separate border-spacing-y-2 text-gray-400" key={dataUpdatedAt}>
            <thead className="text-left">
              <tr>
                <th className="pl-3">Descrição</th>
                <th className="px-2">Valor</th>
                <th className="px-2">Tipo</th>
                <th className="px-2">Data</th>
                <th className="w-[50px]" />
              </tr>
            </thead>

            <tbody>
              {data &&
                data.finances.map(finance => {
                  return (
                    <tr key={finance.id} className="h-12 whitespace-nowrap text-gray-200 bg-gray-700">
                      <td className="pl-3 pr-2 rounded-tl-lg rounded-bl-lg">{finance.description}</td>
                      <td
                        className={`px-2
                    ${finance.type == "Saída" && "text-red-500"}
                    ${finance.type == "Entrada" && "text-green-500"}
                    ${finance.type == "Contas a pagar" && "text-orange-500"}
                  ${finance.type == "Contas a receber" && "text-cyan-500"}`}
                      >
                        {useConvertToBRL(
                          finance.type == "Saída" || finance.type == "Contas a pagar"
                            ? finance.amount * -1
                            : finance.amount
                        )}
                      </td>
                      <td
                        className={`px-2
                      ${finance.type == "Saída" && "text-red-500"}
                      ${finance.type == "Entrada" && "text-green-500"}
                    ${finance.type == "Contas a pagar" && "text-orange-500"}
                    ${finance.type == "Contas a receber" && "text-cyan-500"}`}
                      >
                        {finance.type}
                      </td>
                      <td className="px-2">{dayjs(finance.date).format("DD/MM/YYYY")}</td>
                      <td className="lg:max-w-[20px] rounded-tr-lg rounded-br-lg">
                        <DropdownMenu type={type} finance={finance} />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        )}
      </div>

      <Pagination totalCountOfRegisters={data?.totalCount} currentPage={page} onPageChange={setPage} />
    </div>
  )
}
