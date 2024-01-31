import { ReactNode } from "react"

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url(../assets/bg-default.svg)]">
      {children}
    </div>
  )
}
