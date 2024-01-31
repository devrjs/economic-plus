import { api } from "@/lib/api"
import Cookies from "js-cookie"
import { useQuery } from "react-query"
import { GetFinancesResponse } from "./useFinances"

export async function getPendencies(
  page: number,
  search_description: string,
  selectedCategory: string,
  toUpdate: boolean
): Promise<GetFinancesResponse> {
  const token = Cookies.get("token")

  const { data, headers } = await api.get("/list/pendencies", {
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

export function usePendencies(page: number, search_description: string, selectedCategory: string, toUpdate: boolean) {
  return useQuery<GetFinancesResponse, Error>(
    ["pendencies", page, search_description, selectedCategory, toUpdate],
    () => getPendencies(page, search_description, selectedCategory, toUpdate),
    {
      staleTime: 1000 * 5,
    }
  )
}
