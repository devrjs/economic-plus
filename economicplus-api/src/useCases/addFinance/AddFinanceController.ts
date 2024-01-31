import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { AddFinanceUseCase } from "./AddFinanceUseCase"

class AddFinanceController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const financeDataSchema = z.object({
      description: z.string(),
      amount: z.number(),
      date: z.string(),
      type: z.string(),
      category_id: z.string().optional(),
    })

    const { description, amount, date, type, category_id } = financeDataSchema.parse(request.body)

    const user_id = request.userId

    const addFinance = new AddFinanceUseCase()
    const finance = await addFinance.execute({ user_id, description, amount, date, type, category_id })

    return reply.send(finance)
  }
}

export { AddFinanceController }
