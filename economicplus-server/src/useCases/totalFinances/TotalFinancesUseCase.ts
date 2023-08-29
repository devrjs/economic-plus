import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  category_id?: string
}

interface TotalFinancesUseCasePromise {
  expenses: number
  earnings: number
  profit: number
  expensesTotalRecords: number
  earningsTotalRecords: number
  latestExpenses: object[]
  latestEarnings: object[]
  expensesAmounts: { x: Date; y: number }[]
  earningsAmounts: { x: Date; y: number }[]
}

class TotalFinancesUseCase {
  async execute({ user_id, category_id }: IRequest): Promise<TotalFinancesUseCasePromise> {
    const finances = await prisma.finances.findMany({
      where: {
        userId: user_id,
        categoryId: category_id == "" ? undefined : category_id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

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

    const expensesTotalRecords = finances.filter(finance => finance.type === "Saída").length
    const earningsTotalRecords = finances.filter(finance => finance.type === "Entrada").length

    const latestExpenses = finances.filter(finance => finance.type === "Saída").slice(0, 3)
    const latestEarnings = finances.filter(finance => finance.type === "Entrada").slice(0, 3)

    const expensesAmounts: { x: Date; y: number }[] = []
    const earningsAmounts: { x: Date; y: number }[] = []

    finances.forEach(finance => {
      if (finance.type === "Saída") {
        const existingDate = expensesAmounts.find(item => item.x.getTime() === finance.date.getTime())
        if (existingDate) {
          existingDate.y += finance.amount
        } else {
          expensesAmounts.push({ x: finance.date, y: finance.amount })
        }
      } else if (finance.type === "Entrada") {
        const existingDate = earningsAmounts.find(item => item.x.getTime() === finance.date.getTime())
        if (existingDate) {
          existingDate.y += finance.amount
        } else {
          earningsAmounts.push({ x: finance.date, y: finance.amount })
        }
      }
    })

    expensesAmounts.sort((a, b) => a.x.getTime() - b.x.getTime())
    earningsAmounts.sort((a, b) => a.x.getTime() - b.x.getTime())

    return {
      expenses,
      earnings,
      profit,
      expensesTotalRecords,
      earningsTotalRecords,
      latestExpenses,
      latestEarnings,
      expensesAmounts,
      earningsAmounts,
    }
  }
}

export { TotalFinancesUseCase }
