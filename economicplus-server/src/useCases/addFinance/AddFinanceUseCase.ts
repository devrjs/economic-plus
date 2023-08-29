import dayjs from "dayjs"
import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  description: string
  amount: number
  date: string
  type: string
  category_id?: string
}

class AddFinanceUseCase {
  async execute({ user_id, description, amount, date, type, category_id }: IRequest): Promise<object> {
    const finance = await prisma.finances.create({
      data: {
        description,
        amount,
        date: dayjs(date).toDate(),
        type,
        userId: user_id,
        categoryId: category_id == "" ? undefined : category_id,
      },
    })

    return finance
  }
}

export { AddFinanceUseCase }
