"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useContext } from "react"
import { Modal } from "./Modal"

interface PageHeaderProps {
  title: string
  addButton?: "Adicionar Finança" | "Adicionar Pendência" | "Adicionar Categoria"
}

export function PageHeader({ title, addButton }: PageHeaderProps) {
  const { setStageFinance, setStageCategory } = useContext(FinanceContext)

  return (
    <header className="w-full flex flex-col gap-3 px-2 justify-between sm:h-12 sm:flex-row">
      <h1 className="whitespace-nowrap text-2xl">{title}</h1>

      {addButton && (
        <Modal
          type={
            addButton == "Adicionar Finança"
              ? "finances"
              : addButton == "Adicionar Pendência"
              ? "pendencies"
              : "category"
          }
        >
          <button
            onClick={() => {
              setStageFinance(undefined)
              setStageCategory(undefined)
            }}
            className="h-12 inline-flex select-none items-center justify-center bg-gray-700 hover:bg-green-500 hover:text-gray-900 rounded-md px-4 py-2 text-base font-medium focus:outline-none"
          >
            {addButton}
          </button>
        </Modal>
      )}
    </header>
  )
}
