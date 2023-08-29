import { PageHeader } from "@/components/PageHeader"
import { UserForm } from "@/components/UserForm"

export default function Profile() {
  return (
    <section className="w-full min-h-[600px] flex flex-col items-center px-2 py-4 bg-gray-900 rounded-2xl">
      <PageHeader title="Perfil do Usuário" />

      <UserForm />
    </section>
  )
}
