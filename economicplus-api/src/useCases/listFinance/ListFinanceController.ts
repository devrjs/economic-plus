import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ListFinanceUseCase } from "./ListFinanceUseCase"

class ListFinanceController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const financeDataSchema = z.object({
      category_id: z.string().optional(),
      search_description: z.string().optional(),
      page: z.string(),
    })

    const { category_id, search_description, page } = financeDataSchema.parse(request.query)

    const per_page = 10
    const user_id = request.userId

    const listFinance = new ListFinanceUseCase()
    const { total, finances } = await listFinance.execute({
      user_id,
      page: Number(page),
      per_page,
      category_id,
      search_description,
    })

    reply.header("x-total-count", String(total))

    reply.send(finances)
  }
}

export { ListFinanceController }
