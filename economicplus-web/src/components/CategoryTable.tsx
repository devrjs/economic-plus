"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useCategories } from "@/hooks/useCategories"
import dayjs from "dayjs"
import { useContext, useState } from "react"
import { DropdownMenu } from "./DropdownMenu"
import { Pagination } from "./Pagination"
import { Search } from "./Search"
import { Spinner } from "./Spinner"

export function CategoryTable() {
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const { toUpdate } = useContext(FinanceContext)

  const { data, error, isLoading, dataUpdatedAt } = useCategories(page, searchValue, toUpdate)

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
        ) : data && data?.categories.length <= 0 ? (
          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
            <span className="p-8 border border-gray-800 rounded-full">Nenhum registro cadastrado!</span>
          </div>
        ) : (
          <table className="w-full border-separate border-spacing-y-2 text-gray-400" key={dataUpdatedAt}>
            <thead className="text-left">
              <tr>
                <th className="pl-3">Descrição</th>
                <th className="px-2">Data de Criação</th>
                <th className="w-[50px]" />
              </tr>
            </thead>

            <tbody>
              {data &&
                data.categories.map(category => {
                  return (
                    <tr key={category.id} className="h-12 whitespace-nowrap text-gray-200 bg-gray-700">
                      <td className="pl-3 pr-2 rounded-tl-lg rounded-bl-lg">{category.description}</td>
                      <td className="px-2">{dayjs(category.createdAt).format("DD/MM/YYYY")}</td>
                      <td className="lg:max-w-[20px] rounded-tr-lg rounded-br-lg">
                        <DropdownMenu type="category" category={category} />
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
