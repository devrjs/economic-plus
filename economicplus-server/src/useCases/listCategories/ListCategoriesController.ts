import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ListCategoriesUseCase } from "./ListCategoriesUseCase"

class ListCategoriesController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const categoryDataSchema = z.object({
      search_description: z.string(),
      page: z.string(),
    })

    const { search_description, page } = categoryDataSchema.parse(request.query)

    const per_page = 10
    const user_id = request.userId

    const listCategories = new ListCategoriesUseCase()
    const { categories, total } = await listCategories.execute({
      user_id,
      page: Number(page),
      per_page,
      search_description,
    })

    reply.header("x-total-count", String(total))

    reply.send(categories)
  }
}
export { ListCategoriesController }
