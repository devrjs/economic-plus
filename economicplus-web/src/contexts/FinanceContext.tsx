"use client"

import { Category } from "@/hooks/useCategories"
import { Finance } from "@/hooks/useFinances"
import { ReactNode, SetStateAction, createContext, useState } from "react"

interface FinanceContextType {
  selectedCategory: string
  setSelectedCategory: React.Dispatch<SetStateAction<string>>
  stageFinance: Finance | undefined
  setStageFinance: React.Dispatch<SetStateAction<Finance | undefined>>
  stageCategory: Category | undefined
  setStageCategory: React.Dispatch<SetStateAction<Category | undefined>>
  toUpdate: boolean
  setToUpdate: React.Dispatch<SetStateAction<boolean>>
}

export const FinanceContext = createContext({} as FinanceContextType)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [stageFinance, setStageFinance] = useState<Finance | undefined>(undefined)
  const [stageCategory, setStageCategory] = useState<Category | undefined>(undefined)
  const [toUpdate, setToUpdate] = useState(false)

  return (
    <FinanceContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        stageFinance,
        setStageFinance,
        stageCategory,
        setStageCategory,
        toUpdate,
        setToUpdate,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}
