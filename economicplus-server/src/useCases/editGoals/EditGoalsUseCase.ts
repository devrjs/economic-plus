import { prisma } from "../../lib/prisma"

interface IRequest {
  goal_id: string
  starting_amount: number
  target_amount: number
  target_date: string
  category_id?: string
  user_id: string
}

class EditGoalsUseCase {
  async execute({
    goal_id,
    starting_amount,
    target_amount,
    target_date,
    category_id,
    user_id,
  }: IRequest): Promise<object> {
    const goals = await prisma.goals.update({
      where: {
        id: goal_id,
        userId: user_id,
      },
      data: {
        startingAmount: starting_amount,
        targetAmount: target_amount,
        targetDate: target_date,
        categoryId: category_id == "" ? undefined : category_id,
      },
    })

    return goals
  }
}

export { EditGoalsUseCase }
