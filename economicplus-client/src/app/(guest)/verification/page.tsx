import { SendEmailButton } from "@/components/SendEmailButton"
import { LogOut } from "lucide-react"

export default function Verification() {
  return (
    <div className="w-[40rem] flex flex-col justify-center gap-6 px-8 pt-6 pb-8 bg-gray-800 rounded-xl">
      <h1 className="text-xl font-semibold">Verificação de e-mail</h1>

      <p>
        Para completar seu cadastro, pedimos que confirme seu endereço de e-mail na mensagem enviada para sua caixa
        postal.
      </p>

      <div className="w-full flex justify-between">
        <SendEmailButton type="verification" />

        <a
          href="/api/auth/logout"
          className="w-full max-w-[95px] h-12 flex justify-between px-4 py-3 rounded bg-gray-700 hover:bg-gray-900 text-gray-100 hover:text-red-400"
        >
          <LogOut size={22} />
          <span>Sair</span>
        </a>
      </div>
    </div>
  )
}
