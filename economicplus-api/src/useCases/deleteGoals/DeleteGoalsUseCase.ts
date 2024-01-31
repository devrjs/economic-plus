import { prisma } from "../../lib/prisma"

interface IRequest {
  goal_id: string
}

class DeleteGoalsUseCase {
  async execute({ goal_id }: IRequest): Promise<void> {
    await prisma.goals.delete({
      where: {
        id: goal_id,
      },
    })
  }
}

export { DeleteGoalsUseCase }
