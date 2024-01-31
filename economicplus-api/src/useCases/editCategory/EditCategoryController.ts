import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { EditCategoryUseCase } from "./EditCategoryUseCase"

class EditCategoryController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const categoryDataSchema = z.object({
      description: z.string(),
      category_id: z.string(),
    })

    const { description, category_id } = categoryDataSchema.parse(request.body)

    const user_id = request.userId

    const editCategory = new EditCategoryUseCase()
    const category = await editCategory.execute({ description, user_id, category_id })

    return reply.send(category)
  }
}

export { EditCategoryController }
