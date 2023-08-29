"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { api } from "@/lib/api"
import * as SelectPrimitive from "@radix-ui/react-select"
import Cookies from "js-cookie"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { useContext, useEffect, useState } from "react"

type Category = {
  id: string
  description: string
  createdAt: string
  userId: string
}

export function SelectCategory() {
  const { selectedCategory, setSelectedCategory } = useContext(FinanceContext)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const token = Cookies.get("token")

    api
      .get("/all/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setCategories(response.data)
      })
  }, [])

  return (
    <SelectPrimitive.Root
      defaultValue={selectedCategory}
      onValueChange={value => {
        setSelectedCategory(value)
      }}
    >
      <SelectPrimitive.Trigger asChild aria-label="Category">
        <button className="inline-flex select-none items-center justify-center bg-gray-700 rounded-md px-4 py-2 text-base font-medium focus:outline-none">
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDown size={20} />
          </SelectPrimitive.Icon>
        </button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content className="overflow-hidden bg-gray-700 rounded-lg">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 bg-gradient-to-b from-gray-900 dark:text-gray-300">
          <ChevronUp />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg">
          <SelectPrimitive.Group>
            <SelectPrimitive.Item
              value=""
              className={
                "relative flex items-center cursor-default px-8 py-2 rounded-md text-base outline-none text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-purple-600 dark:focus:text-gray-100"
              }
            >
              <SelectPrimitive.ItemText>Geral</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <Check size={15} />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>

            {categories.map(category => (
              <SelectPrimitive.Item
                key={category.id}
                value={category.id}
                className={
                  "relative flex items-center cursor-default px-8 py-2 rounded-md text-base outline-none text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-purple-600 dark:focus:text-gray-100"
                }
              >
                <SelectPrimitive.ItemText>{category.description}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <Check size={15} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 bg-gradient-to-t from-gray-900 dark:text-gray-300">
          <ChevronDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}
