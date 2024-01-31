import { FinanceTable } from "@/components/FinanceTable"
import { PageHeader } from "@/components/PageHeader"

export default function Pendencies() {
  return (
    <section className="w-full min-h-[600px] flex flex-col px-2 py-4 bg-gray-900 rounded-2xl">
      <PageHeader title="Finanças Pendetes" addButton="Adicionar Pendência" />

      <FinanceTable type="pendencies" />
    </section>
  )
}
