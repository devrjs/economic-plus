import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  description: string
}

class AddCategoryUseCase {
  async execute({ user_id, description }: IRequest): Promise<object> {
    const category = await prisma.category.create({
      data: {
        description,
        userId: user_id,
      },
    })

    return category
  }
}

export { AddCategoryUseCase }
