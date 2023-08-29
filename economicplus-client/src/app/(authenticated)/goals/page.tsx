import { GoalsContent } from "@/components/GoalsContent"
import { PageHeader } from "@/components/PageHeader"

export default function Goals() {
  return (
    <section className="w-full min-h-[600px] flex flex-col items-center px-2 py-4 bg-gray-900 rounded-2xl">
      <PageHeader title="Carteira e Metas" />

      <GoalsContent />
    </section>
  )
}
