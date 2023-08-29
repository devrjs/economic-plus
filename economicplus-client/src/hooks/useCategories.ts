import { api } from "@/lib/api"
import { useQuery } from "react-query"

export type Category = {
  id: string
  description: string
  createdAt: string
  userId: string
}

export type GetCategoryResponse = {
  totalCount: number
  categories: Category[]
}

export async function getCategories(
  page: number,
  search_description: string,
  toUpdate: boolean
): Promise<GetCategoryResponse> {
  const { data, headers } = await api.get("/list/categories", {
    params: {
      page,
      search_description,
    },
  })

  const totalCount = Number(await headers["x-total-count"])

  return { categories: data, totalCount }
}

export function useCategories(page: number, search_description: string, toUpdate: boolean) {
  return useQuery(
    ["categories", page, search_description, toUpdate],
    () => getCategories(page, search_description, toUpdate),
    {
      staleTime: 1000 * 5,
    }
  )
}
