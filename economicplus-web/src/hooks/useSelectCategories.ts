import { api } from "@/lib/api"
import Cookies from "js-cookie"
import { useQuery } from "react-query"
import { Category } from "./useCategories"

type GetCategoryResponse = {
  categories: Category[]
}

export async function getCategories(toUpdate: boolean): Promise<GetCategoryResponse> {
  const token = Cookies.get("token")

  const { data } = await api.get("/all/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return { categories: data }
}

export function useSelectCategories(toUpdate: boolean) {
  return useQuery(["categories", toUpdate], () => getCategories(toUpdate), {
    staleTime: 1000 * 5,
  })
}
