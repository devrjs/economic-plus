import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  page: number
  per_page: number
  search_description?: string
}

type ListCategoriesUseCasePromise = { total: number; categories: object }

class ListCategoriesUseCase {
  async execute({ user_id, page, per_page, search_description }: IRequest): Promise<ListCategoriesUseCasePromise> {
    const skip = (page - 1) * per_page
    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where: {
          userId: user_id,
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
      prisma.category.count({
        where: {
          userId: user_id,
          description: {
            contains: search_description,
          },
        },
      }),
    ])

    return { total, categories }
  }
}
export { ListCategoriesUseCase }
