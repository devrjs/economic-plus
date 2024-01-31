import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { AddGoalsUseCase } from "./AddGoalsUseCase"

class AddGoalsController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const goalsDataSchema = z.object({
      category_id: z.string().optional(),
      starting_amount: z.number(),
      target_amount: z.number(),
      target_date: z.string(),
    })

    const { category_id, starting_amount, target_amount, target_date } = goalsDataSchema.parse(request.body)

    const user_id = request.userId

    const addGoals = new AddGoalsUseCase()
    const goals = await addGoals.execute({ starting_amount, target_amount, target_date, category_id, user_id })

    reply.send(goals)
  }
}

export { AddGoalsController }
