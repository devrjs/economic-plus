import { api } from "@/lib/api"
import Cookies from "js-cookie"
import { useQuery } from "react-query"

export type Goals = {
  id: string | null
  startingAmount: number
  targetAmount: number
  targetDate: Date
  currentAmount: number
  percentageReached: string
  statusMessage: string
}

export type goalsResponse = {
  goals: Goals
}

export async function getGoals(selectedCategory: string, toUpdate: boolean): Promise<goalsResponse> {
  const token = Cookies.get("token")

  const { data } = await api.get("/view/goals", {
    params: {
      category_id: selectedCategory,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return { goals: data }
}

export function useGoals(selectedCategory: string, toUpdate: boolean) {
  return useQuery<goalsResponse, Error>(
    ["goals", selectedCategory, toUpdate],
    () => getGoals(selectedCategory, toUpdate),
    {
      staleTime: 1000 * 5,
    }
  )
}
