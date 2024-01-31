import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase"

class DeleteCategoryController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const categoryDataSchema = z.object({
      category_id: z.string(),
    })

    const { category_id } = categoryDataSchema.parse(request.body)

    const user_id = request.userId

    const deleteCategoryUseCase = new DeleteCategoryUseCase()
    await deleteCategoryUseCase.execute({ category_id, user_id })

    reply.send()
  }
}
export { DeleteCategoryController }
