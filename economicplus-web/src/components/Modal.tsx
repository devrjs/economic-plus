"use client"

import { Transition } from "@headlessui/react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { Fragment, ReactNode, useState } from "react"
import { CategoryForm } from "./CategoryForm"
import { FinanceForm } from "./FinanceForm"

interface ModalProps {
  type: "finances" | "pendencies" | "category"
  children: ReactNode
}

export function Modal({ type, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay forceMount className="fixed inset-0 bg-black/50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className="w-full max-w-[380px] max-h-screen overflow-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-5 pb-6 px-6 bg-gray-800 sm:rounded-3xl shadow-lg shadow-black/25"
            >
              <DialogPrimitive.Title className="text-xl font-medium text-gray-900 dark:text-gray-100">
                {type == "category" ? "Adicionar Categoria" : "Adicionar Finança"}
              </DialogPrimitive.Title>

              {type == "finances" && <FinanceForm type="finances" setIsOpen={setIsOpen} />}
              {type == "pendencies" && <FinanceForm type="pendencies" setIsOpen={setIsOpen} />}
              {type == "category" && <CategoryForm setIsOpen={setIsOpen} />}

              <DialogPrimitive.Close className="absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1">
                <X className="w-7 h-auto text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
