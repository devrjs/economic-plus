import { ForgotForm } from "@/components/ForgotForm"

export default function Forgot() {
  return (
    <div className="w-[28rem] flex flex-col justify-center gap-6 px-8 pt-6 pb-8 bg-gray-800 rounded-xl">
      <h1 className="text-xl font-semibold">Recuperação de senha</h1>

      <ForgotForm />
    </div>
  )
}
