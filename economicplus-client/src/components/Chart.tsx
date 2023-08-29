"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useTotalFinances } from "@/hooks/useTotalFinances"
import { ApexOptions } from "apexcharts"
import dynamic from "next/dynamic"
import { useContext } from "react"
import { Spinner } from "./Spinner"

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
})

export const options: ApexOptions = {
  chart: {
    // offsetX: -6,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: "#757b8c",
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  colors: ["#D73754", "#1FCB4F"],
  stroke: {
    curve: "smooth",
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0,
      opacityTo: 0,
    },
  },
  tooltip: {
    enabled: true,
    shared: true,
    followCursor: true,
    theme: "dark",
    style: {
      fontSize: "12px",
      fontFamily: "Ubuntu, sans-serif",
    },
  },
  grid: {
    show: true,
    borderColor: "#1d1f25",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        // show: false,
      },
    },
  },
  xaxis: {
    type: "datetime",
    axisBorder: { color: "#757b8c" },
    axisTicks: { color: "#757b8c" },
  },
}

export function FinanceChart() {
  const { selectedCategory } = useContext(FinanceContext)
  const { data, error, isLoading, dataUpdatedAt } = useTotalFinances(selectedCategory)

  const series = [
    {
      name: "Gastos",
      data: data?.totalFinances.expensesAmounts,
    },
    {
      name: "Ganhos",
      data: data?.totalFinances.earningsAmounts,
    },
  ]

  return (
    <div className="w-full min-h-[300px] xl:min-h-[450px] overflow-hidden pt-4 pb-2 2xl:pr-4 bg-gray-900 rounded-2xl">
      <h1 className="text-2xl px-4">Relatório Gráfico</h1>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center">
          <span>Falha ao carregar!</span>
        </div>
      ) : (
        <Chart width="100%" height="100%" series={series as any} key={dataUpdatedAt} options={options} type="area" />
      )}
    </div>
  )
}
