import { api } from "@/lib/api"
import Cookies from "js-cookie"
import { useQuery } from "react-query"

export type Finance = {
  id: string
  description: string
  amount: number
  date: string
  type: string
  createdAt: string
  categoryId: string
  userId: string
}

export type GetFinancesResponse = {
  totalCount: number
  finances: Finance[]
}

export async function getFinances(
  page: number,
  search_description: string,
  selectedCategory: string,
  toUpdate: boolean
): Promise<GetFinancesResponse> {
  const token = Cookies.get("token")

  const { data, headers } = await api.get("/list/finance", {
    params: {
      page,
      category_id: selectedCategory,
      search_description,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const totalCount = Number(await headers["x-total-count"])

  return { finances: data, totalCount }
}

export function useFinances(page: number, search_description: string, selectedCategory: string, toUpdate: boolean) {
  return useQuery<GetFinancesResponse, Error>(
    ["finances", page, search_description, selectedCategory, toUpdate],
    () => getFinances(page, search_description, selectedCategory, toUpdate),
    {
      staleTime: 1000 * 5,
    }
  )
}
