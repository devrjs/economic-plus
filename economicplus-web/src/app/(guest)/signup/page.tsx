import { SignUpForm } from "@/components/SignUpForm"

export default function SignUp() {
  return (
    <div className="w-[26rem] flex flex-col justify-center gap-6 px-8 pt-6 pb-8 bg-gray-800 rounded-xl">
      <h1 className="text-xl font-semibold">Crie sua conta</h1>

      <SignUpForm />
    </div>
  )
}
