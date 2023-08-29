import { api } from "@/lib/api"
import Cookies from "js-cookie"
import { useQuery } from "react-query"

export type User = {
  email: string
  name: string
}

export type userResponse = {
  user: User
}

export async function getUser(toUpdate: boolean): Promise<userResponse> {
  const token = Cookies.get("token")

  const { data } = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return { user: data }
}

export function useUser(toUpdate: boolean) {
  return useQuery<userResponse, Error>(["user", toUpdate], () => getUser(toUpdate), {
    staleTime: 1000 * 5,
  })
}
