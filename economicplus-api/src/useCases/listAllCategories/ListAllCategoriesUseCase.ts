import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
}

class ListAllCategoriesUseCase {
  async execute({ user_id }: IRequest): Promise<Array<object>> {
    const categories = await prisma.category.findMany({
      where: {
        userId: user_id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return categories
  }
}

export { ListAllCategoriesUseCase }
