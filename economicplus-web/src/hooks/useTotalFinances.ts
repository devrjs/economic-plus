import { api } from "@/lib/api"
import Cookies from "js-cookie"
import { useQuery } from "react-query"

export type financesData = {
  expenses: number
  earnings: number
  profit: number
  expensesTotalRecords: number
  earningsTotalRecords: number
  latestExpenses: Array<{
    id: string
    description: string
    amount: number
    date: string
  }>
  latestEarnings: Array<{
    id: string
    description: string
    amount: number
    date: string
  }>
  expensesAmounts: { x: string; y: number }[]
  earningsAmounts: { x: string; y: number }[]
}

export type totalFinancesResponse = {
  totalFinances: financesData
}

export async function totalFinances(selectedCategory: string): Promise<totalFinancesResponse> {
  const token = Cookies.get("token")

  const { data } = await api.get("/total/finances", {
    params: {
      category_id: selectedCategory,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return { totalFinances: data }
}

export function useTotalFinances(selectedCategory: string) {
  return useQuery<totalFinancesResponse, Error>(
    ["totalFinances", selectedCategory],
    () => totalFinances(selectedCategory),
    {
      staleTime: 1000 * 5,
    }
  )
}
