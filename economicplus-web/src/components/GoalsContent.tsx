"use client"

import { FinanceContext } from "@/contexts/FinanceContext"
import { useConvertCurrencyToNumber } from "@/hooks/useConvertCurrencyToNumber"
import { useConvertToBRL } from "@/hooks/useConvertToBRL"
import { useDateFormatToUTC } from "@/hooks/useDateFormatToUTC"
import { useGoals } from "@/hooks/useGoals"
import { api } from "@/lib/api"
import dayjs from "dayjs"
import Cookies from "js-cookie"
import { Activity, BadgePercent, Calendar, Goal, PiggyBank, Wallet2 } from "lucide-react"
import { useContext, useState } from "react"
import { Button } from "./Button"
import { GoalCard } from "./GoalCard"
import { Spinner } from "./Spinner"

// refactor this component's code later
export function GoalsContent() {
  const { selectedCategory, toUpdate, setToUpdate } = useContext(FinanceContext)
  const { data, error, isLoading, dataUpdatedAt } = useGoals(selectedCategory, toUpdate)
  const [startingAmount, setStartingAmount] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isExcluding, setIsExcluding] = useState(false)
  const [targetAmount, setTargetAmount] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const token = Cookies.get("token")

  async function saveGoal() {
    try {
      setIsSaving(true)

      if (data && data.goals.id) {
        await api.post(
          "/edit/goals",
          {
            goal_id: data.goals.id,
            starting_amount: startingAmount ? useConvertCurrencyToNumber(startingAmount) : data.goals.targetAmount,
            target_amount: targetAmount ? useConvertCurrencyToNumber(targetAmount) : data.goals.targetAmount,
            target_date: targetDate
              ? dayjs(useDateFormatToUTC(targetDate)).format("YYYY-MM-DDT[03]:mm:ss[Z]")
              : data.goals.targetDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } else {
        await api.post(
          "/add/goals",
          {
            category_id: selectedCategory,
            starting_amount: useConvertCurrencyToNumber(startingAmount),
            target_amount: useConvertCurrencyToNumber(targetAmount),
            target_date: dayjs(useDateFormatToUTC(targetDate)).format("YYYY-MM-DDT[03]:mm:ss[Z]"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }

      setToUpdate(!toUpdate)
    } catch (error) {
      // handle error
    } finally {
      setIsSaving(false)
    }
  }

  async function deleteGoal() {
    try {
      setIsExcluding(true)

      if (data && data.goals.id) {
        await api.post(
          "/delete/goals",
          {
            goal_id: data.goals.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }

      setToUpdate(!toUpdate)
    } catch (error) {
      // handle error
    } finally {
      setIsExcluding(false)
    }
  }

  return (
    <div key={dataUpdatedAt} className="w-full h-full flex flex-col items-center">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col xl:flex-row gap-4 p-4">
            <GoalCard
              title="Saldo inicial"
              value={data && useConvertToBRL(data.goals.startingAmount)}
              icon={<PiggyBank size={45} />}
              setStartingAmount={setStartingAmount}
              textColor="text-green-500"
            />
            <GoalCard
              title="Valor da meta"
              value={data && useConvertToBRL(data.goals.targetAmount)}
              icon={<Goal size={37} />}
              setTargetAmount={setTargetAmount}
              textColor="text-orange-500"
            />
            <GoalCard
              title="Data da meta"
              value={
                data && data.goals.statusMessage == "Meta não definida!"
                  ? "dd/mm/aaaa"
                  : dayjs(data?.goals.targetDate).format("DD/MM/YYYY")
              }
              icon={<Calendar size={35} />}
              setTargetDate={setTargetDate}
              textColor="text-orange-500"
            />
          </div>
          <div className="flex flex-col xl:flex-row gap-4 p-4">
            <GoalCard
              title="Saldo atual"
              value={data && useConvertToBRL(data.goals.currentAmount)}
              icon={<Wallet2 size={35} />}
              textColor="text-yellow-500"
              disabled
            />
            <GoalCard
              title="Procentagem alcançada"
              value={data?.goals.percentageReached}
              icon={<BadgePercent size={37} />}
              textColor="text-yellow-500"
              disabled
            />
            <GoalCard
              title="Status"
              value={data?.goals.statusMessage}
              icon={<Activity size={35} />}
              textColor="text-yellow-500"
              disabled
            />
          </div>
        </>
      )}

      <div className="w-full max-w-[500px] flex gap-4 mt-auto mb-6">
        <Button onClick={() => deleteGoal()}>{isExcluding ? <Spinner /> : "Excluir"}</Button>
        <Button onClick={() => saveGoal()}>{isSaving ? <Spinner /> : "Salvar"}</Button>
      </div>
    </div>
  )
}
