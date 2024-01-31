import { prisma } from "../../lib/prisma"

interface IRequest {
  category_id: string
  user_id: string
}

class DeleteCategoryUseCase {
  async execute({ category_id, user_id }: IRequest): Promise<void> {
    await Promise.all([
      prisma.finances.deleteMany({
        where: {
          categoryId: category_id,
          userId: user_id,
        },
      }),

      prisma.goals.deleteMany({
        where: {
          categoryId: category_id,
          userId: user_id,
        },
      }),
    ])

    await prisma.category.delete({
      where: {
        id: category_id,
        userId: user_id,
      },
    })

    return
  }
}

export { DeleteCategoryUseCase }
