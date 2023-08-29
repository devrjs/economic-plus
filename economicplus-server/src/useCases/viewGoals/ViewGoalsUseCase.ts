import dayjs from "dayjs"
import { prisma } from "../../lib/prisma"

interface IRequest {
  category_id?: string
  user_id: string
}

interface ViewGoalsUseCasePromise {
  id: string | null
  startingAmount: number
  targetAmount: number
  targetDate: Date
  currentAmount: number
  percentageReached: string
  statusMessage: string
}

class ViewGoalsUseCase {
  async execute({ category_id, user_id }: IRequest): Promise<ViewGoalsUseCasePromise> {
    const [goals, finances] = await Promise.all([
      prisma.goals.findFirst({
        where: {
          categoryId: category_id == "" ? undefined : category_id,
          userId: user_id,
        },
      }),
      prisma.finances.findMany({
        where: {
          userId: user_id,
          categoryId: category_id == "" ? undefined : category_id,
        },
      }),
    ])

    const expenses = finances.reduce((acc, finance) => {
      if (finance.type === "Saída") {
        return acc + finance.amount
      }
      return acc
    }, 0)

    const earnings = finances.reduce((acc, finance) => {
      if (finance.type === "Entrada") {
        return acc + finance.amount
      }
      return acc
    }, 0)

    const profit = earnings - expenses

    const currentAmount = (goals && goals.startingAmount + profit) ?? 0

    const calculatePercentageReached = (
      startingAmount: number,
      currentAmount: number,
      targetAmount: number
    ): string => {
      if (startingAmount < targetAmount) {
        const percentageReached = ((currentAmount - startingAmount) / (targetAmount - startingAmount)) * 100
        return percentageReached.toFixed(2) + "%"
      } else if (startingAmount > targetAmount) {
        const percentageReached = ((startingAmount - currentAmount) / (startingAmount - targetAmount)) * 100
        return percentageReached.toFixed(2) + "%"
      }
      return "0%"
    }

    const statusMessage = (): string => {
      if (!goals?.targetDate) {
        return "Meta não definida!"
      }

      if (dayjs().isAfter(goals?.targetDate || new Date())) {
        if (currentAmount >= (goals?.targetAmount || 0)) {
          return "Meta alcançada!"
        } else {
          return "Meta não alcançada!"
        }
      }
      return "Em andamento!"
    }

    return {
      id: goals?.id || null,
      startingAmount: goals?.startingAmount || 0,
      targetAmount: goals?.targetAmount || 0,
      targetDate: goals?.targetDate || new Date(),
      currentAmount: currentAmount,
      percentageReached: calculatePercentageReached(
        goals?.startingAmount || 0,
        currentAmount,
        goals?.targetAmount || 0
      ),
      statusMessage: statusMessage(),
    }
  }
}

export { ViewGoalsUseCase }
