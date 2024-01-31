import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { AddCategoryUseCase } from "./AddCategoryUseCase"

class AddCategoryController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const categoryDataSchema = z.object({
      description: z.string(),
    })

    const { description } = categoryDataSchema.parse(request.body)

    const user_id = request.userId

    const newCategory = new AddCategoryUseCase()
    const category = await newCategory.execute({ description, user_id })

    return reply.send(category)
  }
}

export { AddCategoryController }
