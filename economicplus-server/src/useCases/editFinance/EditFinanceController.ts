import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { EditFinanceUseCase } from "./EditFinanceUseCase"

class EditFinanceController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const financeDataSchema = z.object({
      finance_id: z.string(),
      description: z.string(),
      amount: z.number(),
      date: z.string(),
      type: z.string(),
      category_id: z.string().optional(),
    })

    const { finance_id, description, amount, date, type, category_id } = financeDataSchema.parse(request.body)

    const EditFinance = new EditFinanceUseCase()
    const finance = await EditFinance.execute({ finance_id, description, amount, date, type, category_id })

    return reply.send(finance)
  }
}

export { EditFinanceController }
