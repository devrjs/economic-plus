import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { TotalFinancesUseCase } from "./TotalFinancesUseCase"

class TotalFinancesController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const financeDataSchema = z.object({
      category_id: z.string().optional(),
    })

    const { category_id } = financeDataSchema.parse(request.query)

    const user_id = request.userId

    const totalFinances = new TotalFinancesUseCase()
    const data = await totalFinances.execute({ user_id, category_id })

    reply.send(data)
  }
}

export { TotalFinancesController }
