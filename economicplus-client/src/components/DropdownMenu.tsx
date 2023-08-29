"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { Category } from "@/hooks/useCategories"
import { Finance } from "@/hooks/useFinances"
import { api } from "@/lib/api"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import Cookies from "js-cookie"
import { CheckCircle2, PenLine, Pencil, Trash } from "lucide-react"
import { useContext } from "react"
import { Modal } from "./Modal"

interface DropdownMenuProps {
  finance?: Finance
  category?: Category
  type: "finances" | "pendencies" | "category"
}

export function DropdownMenu({ finance, category, type }: DropdownMenuProps) {
  const { setStageFinance, setStageCategory, setToUpdate, toUpdate } = useContext(FinanceContext)
  const token = Cookies.get("token")

  async function deleteFinance(finance_id: string) {
    try {
      await api.post(
        "/delete/finance",
        {
          finance_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setToUpdate(!toUpdate)
    } catch (error) {
      // handle error
    }
  }

  async function confirmFinance(finance: Finance) {
    try {
      await api.post(
        "/edit/finance",
        {
          finance_id: finance.id,
          description: finance.description,
          amount: finance.amount,
          date: finance.date,
          type: finance.type == "Contas a pagar" ? "Saída" : "Entrada",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setToUpdate(!toUpdate)
    } catch (error) {
      // handle error
    }
  }

  async function deleteCategory(category_id: string) {
    try {
      await api.post(
        "/delete/category",
        {
          category_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setToUpdate(!toUpdate)
    } catch (error) {
      // handle error
    }
  }

  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="w-10 h-10 flex items-center justify-center ml-auto outline-none bg-gray-900 hover:bg-purple-500 text-[25px] text-purple-500 hover:text-gray-900 rounded-xl">
            <Pencil />
          </button>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            side="left"
            className="flex flex-col rounded-lg px-1.5 py-1 shadow-md bg-gray-800"
          >
            {(finance?.type == "Contas a pagar" || finance?.type == "Contas a receber") && (
              <>
                <DropdownMenuPrimitive.Item
                  onClick={() => confirmFinance(finance)}
                  className="flex cursor-default select-none items-center rounded-md px-2 py-2 text-md outline-none hover:text-gray-100 text-gray-300 hover:bg-purple-600"
                >
                  <CheckCircle2 size={22} />
                  <span className="pl-4">Confirmar</span>
                </DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-700" />
              </>
            )}

            {type == "finances" && (
              <Modal type="finances">
                <button
                  onClick={() => setStageFinance(finance)}
                  className="flex cursor-default select-none items-center rounded-md px-2 py-2 text-md outline-none hover:text-gray-100 text-gray-300 hover:bg-purple-600"
                >
                  <PenLine size={22} />
                  <span className="pl-4">Editar</span>
                </button>
              </Modal>
            )}

            {type == "pendencies" && (
              <Modal type="pendencies">
                <button
                  onClick={() => setStageFinance(finance)}
                  className="flex cursor-default select-none items-center rounded-md px-2 py-2 text-md outline-none hover:text-gray-100 text-gray-300 hover:bg-purple-600"
                >
                  <PenLine size={22} />
                  <span className="pl-4">Editar</span>
                </button>
              </Modal>
            )}

            {type == "category" && (
              <Modal type="category">
                <button
                  onClick={() => setStageCategory(category)}
                  className="flex cursor-default select-none items-center rounded-md px-2 py-2 text-md outline-none hover:text-gray-100 text-gray-300 hover:bg-purple-600"
                >
                  <PenLine size={22} />
                  <span className="pl-4">Editar</span>
                </button>
              </Modal>
            )}

            <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-700" />

            <DropdownMenuPrimitive.Item
              onClick={() =>
                type == "category" ? category && deleteCategory(category.id) : finance && deleteFinance(finance.id)
              }
              className="flex cursor-default select-none items-center rounded-md px-2 py-2 text-md outline-none hover:text-gray-100 text-gray-300 hover:bg-purple-600"
            >
              <Trash size={22} />
              <span className="pl-4">Excluir</span>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Arrow className="fill-gray-800" />
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  )
}
