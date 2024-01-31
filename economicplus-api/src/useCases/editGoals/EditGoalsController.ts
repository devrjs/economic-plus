import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { EditGoalsUseCase } from "./EditGoalsUseCase"

class EditGoalsController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const goalsDataSchema = z.object({
      goal_id: z.string(),
      category_id: z.string().optional(),
      starting_amount: z.number(),
      target_amount: z.number(),
      target_date: z.string(),
    })

    const { goal_id, starting_amount, target_amount, target_date, category_id } = goalsDataSchema.parse(request.body)

    const user_id = request.userId

    const editGoals = new EditGoalsUseCase()
    const goals = await editGoals.execute({
      goal_id,
      starting_amount,
      target_amount,
      target_date,
      category_id,
      user_id,
    })

    reply.send(goals)
  }
}

export { EditGoalsController }
