import { CategoryTable } from "@/components/CategoryTable"
import { PageHeader } from "@/components/PageHeader"

export default function Category() {
  return (
    <section className="w-full min-h-[600px] flex flex-col px-2 py-4 bg-gray-900 rounded-2xl">
      <PageHeader title="Categorizar Finança" addButton="Adicionar Categoria" />

      <CategoryTable />
    </section>
  )
}
