import { SignInForm } from "@/components/SignInForm"
import Image from "next/image"
import Link from "next/link"
import illustration from "../assets/illustration.svg"

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex-1 max-w-5xl flex flex-col sm:flex-row items-center justify-center md:justify-between gap-6 sm:p-8">
        <div className="w-full hidden md:flex flex-col">
          <Image alt="Imagem de ilustração" src={illustration} width="0" height="0" className="w-80 h-auto" priority />
          <h1 className="text-xl font-bold mt-6 text-gray-200">Tenha o controle de seu dinheiro.</h1>
          <p className="mt-1 text-gray-400">Faça login e começe a usar!</p>
        </div>

        <div className="w-full sm:max-w-sm flex flex-col items-center justify-center px-6 pt-4 pb-8 bg-gray-800 overflow-hidden sm:rounded-xl">
          <SignInForm />

          <div className="flex flex-col items-center gap-2">
            <Link href="/signup" className="text-sm text-center text-gray-200 hover:text-white">
              Não possui conta? <span className="text-cyan-400 hover:underline">Registre-se</span>
            </Link>

            <Link href="/forgot" className="text-sm text-gray-400 hover:text-gray-200">
              Esqueceu sua senha?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
