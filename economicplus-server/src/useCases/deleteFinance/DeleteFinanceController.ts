import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { DeleteFinanceUseCase } from "./DeleteFinanceUseCase"

class DeleteFinanceController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const financeDataSchema = z.object({
      finance_id: z.string(),
    })

    const { finance_id } = financeDataSchema.parse(request.body)

    const deleteFinanceUseCase = new DeleteFinanceUseCase()
    await deleteFinanceUseCase.execute({ finance_id })

    return reply.send()
  }
}

export { DeleteFinanceController }
