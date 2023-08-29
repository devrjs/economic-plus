import { FinanceChart } from "@/components/Chart"
import { LastRecordInfo } from "@/components/LastRecordInfo"
import { TotalFinanceCard } from "@/components/TotalFinanceCard"

export default function Dashboard() {
  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <TotalFinanceCard type="Gastos" />
        <TotalFinanceCard type="Ganhos" />
        <TotalFinanceCard type="Balanço" />
      </div>

      <div className="flex flex-col xl:flex-row gap-4">
        <FinanceChart />

        <section className="w-full xl:max-w-[320px] 2xl:max-w-[400px] flex flex-col sm:flex-row xl:flex-col gap-4">
          <LastRecordInfo type="Gastos" />
          <LastRecordInfo type="Ganhos" />
        </section>
      </div>
    </section>
  )
}
