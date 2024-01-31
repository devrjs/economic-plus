import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  page: number
  per_page: number
  category_id?: string
  search_description?: string
}

type ListPendenciesUseCasePromise = { total: number; pendencies: object }

class ListPendenciesUseCase {
  async execute({
    user_id,
    page,
    per_page,
    category_id,
    search_description,
  }: IRequest): Promise<ListPendenciesUseCasePromise> {
    const skip = (page - 1) * per_page
    const [pendencies, total] = await Promise.all([
      prisma.finances.findMany({
        where: {
          userId: user_id,
          categoryId: category_id == "" ? undefined : category_id,
          type: {
            in: ["Contas a pagar", "Contas a receber"],
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
            in: ["Contas a pagar", "Contas a receber"],
          },
          description: {
            contains: search_description,
          },
        },
      }),
    ])

    return { total, pendencies }
  }
}

export { ListPendenciesUseCase }
