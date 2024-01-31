"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Error() {
  const [message, setMessage] = useState("")
  const params = useParams()
  const error = params.error

  useEffect(() => {
    if (error == "400") {
      setMessage("Link invalido!")
    }

    if (error == "401") {
      setMessage("Link expirado!")
    }
  }, [])

  return (
    <div className="w-[28rem] flex flex-col justify-center gap-6 px-8 pt-6 pb-8 bg-gray-800 rounded-xl">
      <span className="text-2xl text-orange-500">{message}</span>
    </div>
  )
}
