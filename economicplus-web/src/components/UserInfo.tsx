"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useUser } from "@/hooks/useUser"
import { useContext } from "react"

export function UserInfo() {
  const { toUpdate } = useContext(FinanceContext)
  const { data, error, isLoading, dataUpdatedAt } = useUser(toUpdate)

  return (
    <div className="hidden sm:flex flex-col items-end" key={dataUpdatedAt}>
      <span className="text-[11pt] text-gray-300">{data?.user.name}</span>
      <span className="text-[10pt] text-gray-400">{data?.user.email}</span>
    </div>
  )
}
