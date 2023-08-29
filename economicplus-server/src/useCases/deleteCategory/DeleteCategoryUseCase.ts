import { prisma } from "../../lib/prisma"

interface IRequest {
  category_id: string
  user_id: string
}

class DeleteCategoryUseCase {
  async execute({ category_id, user_id }: IRequest): Promise<void> {
    await prisma.category.delete({
      where: {
        id: category_id,
        userId: user_id,
      },
    })
  }
}
export { DeleteCategoryUseCase }
