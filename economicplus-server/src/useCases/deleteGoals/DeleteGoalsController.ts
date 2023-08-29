import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { DeleteGoalsUseCase } from "./DeleteGoalsUseCase"

class DeleteGoalsController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const goalsDataSchema = z.object({
      goal_id: z.string(),
    })

    const { goal_id } = goalsDataSchema.parse(request.body)

    const deleteGoals = new DeleteGoalsUseCase()
    await deleteGoals.execute({ goal_id })

    reply.send()
  }
}

export { DeleteGoalsController }
