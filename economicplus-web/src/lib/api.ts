import axios from "axios"
import Cookie from "js-cookie"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${Cookie.get("token")}`,
  },
})
