import { prisma } from "../../lib/prisma"

interface IRequest {
  category_id: string
  user_id: string
}

class DeleteCategoryUseCase {
  async execute({ category_id, user_id }: IRequest): Promise<void> {
    await prisma.finances.deleteMany({
      where: {
        categoryId: category_id,
        AND: {
          userId: user_id,
        },
      },
    })

    await prisma.goals.delete({
      where: {
        categoryId: category_id,
        AND: {
          userId: user_id,
        },
      },
    })

    await prisma.category.delete({
      where: {
        id: category_id,
        AND: {
          userId: user_id,
        },
      },
    })

    return
  }
}
export { DeleteCategoryUseCase }
