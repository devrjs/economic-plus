import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  description: string
  category_id: string
}

class EditCategoryUseCase {
  async execute({ user_id, description, category_id }: IRequest): Promise<object> {
    const category = await prisma.category.update({
      where: {
        id: category_id,
        userId: user_id,
      },
      data: {
        description,
      },
    })

    return category
  }
}

export { EditCategoryUseCase }
