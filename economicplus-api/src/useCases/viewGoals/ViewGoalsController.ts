import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ViewGoalsUseCase } from "./ViewGoalsUseCase"

class ViewGoalsController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const goalsDataSchema = z.object({
      category_id: z.string().optional(),
    })

    const { category_id } = goalsDataSchema.parse(request.query)

    const user_id = request.userId

    const viewGoals = new ViewGoalsUseCase()
    const goals = await viewGoals.execute({ category_id, user_id })

    reply.send(goals)
  }
}

export { ViewGoalsController }
