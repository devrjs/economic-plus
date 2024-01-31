import { FinanceProvider } from "@/contexts/FinanceContext"
import type { Metadata } from "next"
import { Bai_Jamjuree as BaiJamjuree, Roboto_Flex as Roboto } from "next/font/google"
import { ReactNode } from "react"
import { ReactQueryProvider } from "./ReactQueryProvider"
import "./globals.css"

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" })
const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
})

export const metadata: Metadata = {
  title: "Economic Plus",
  description: "Controle de finanças",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <html lang="pt-BR">
        <FinanceProvider>
          <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-800 text-gray-100`}>
            {children}
          </body>
        </FinanceProvider>
      </html>
    </ReactQueryProvider>
  )
}
