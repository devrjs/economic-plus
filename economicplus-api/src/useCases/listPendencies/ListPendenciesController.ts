import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ListPendenciesUseCase } from "./ListPendenciesUseCase"

class ListPendenciesController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const financeDataSchema = z.object({
      category_id: z.string(),
      search_description: z.string(),
      page: z.string(),
    })

    const { category_id, search_description, page } = financeDataSchema.parse(request.query)

    const per_page = 10
    const user_id = request.userId

    const newPendencie = new ListPendenciesUseCase()
    const { pendencies, total } = await newPendencie.execute({
      user_id,
      page: Number(page),
      per_page,
      category_id,
      search_description,
    })

    reply.header("x-total-count", String(total))

    reply.send(pendencies)
  }
}

export { ListPendenciesController }
