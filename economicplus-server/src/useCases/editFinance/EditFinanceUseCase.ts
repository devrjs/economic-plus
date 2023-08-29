import dayjs from "dayjs"
import { prisma } from "../../lib/prisma"

interface IRequest {
  finance_id: string
  description: string
  amount: number
  date: string
  type: string
  category_id?: string
}

class EditFinanceUseCase {
  async execute({ finance_id, description, amount, date, type, category_id }: IRequest): Promise<object> {
    const finance = await prisma.finances.update({
      where: {
        id: finance_id,
      },
      data: {
        description,
        amount,
        date: dayjs(date).toDate(),
        type,
        categoryId: category_id == "" ? undefined : category_id,
      },
    })

    return finance
  }
}

export { EditFinanceUseCase }
