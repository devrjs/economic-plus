import { prisma } from "../../lib/prisma"

interface IRequest {
  finance_id: string
}

class DeleteFinanceUseCase {
  async execute({ finance_id }: IRequest): Promise<void> {
    await prisma.finances.delete({
      where: {
        id: finance_id,
      },
    })
  }
}

export { DeleteFinanceUseCase }
