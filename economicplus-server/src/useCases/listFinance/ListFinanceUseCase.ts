import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  page: number
  per_page: number
  category_id?: string
  search_description?: string
}

type ListFinanceUseCasePromise = { total: number; finances: object }

class ListFinanceUseCase {
  async execute({
    user_id,
    page,
    per_page,
    category_id,
    search_description,
  }: IRequest): Promise<ListFinanceUseCasePromise> {
    const skip = (page - 1) * per_page
    const [finances, total] = await Promise.all([
      prisma.finances.findMany({
        where: {
          userId: user_id,
          categoryId: category_id == "" ? undefined : category_id,
          type: {
            in: ["Saída", "Entrada"],
          },
          description: {
            contains: search_description,
          },
        },
        skip,
        take: per_page,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.finances.count({
        where: {
          userId: user_id,
          categoryId: category_id == "" ? undefined : category_id,
          type: {
            in: ["Saída", "Entrada"],
          },
          description: {
            contains: search_description,
          },
        },
      }),
    ])

    return { total, finances }
  }
}

export { ListFinanceUseCase }
