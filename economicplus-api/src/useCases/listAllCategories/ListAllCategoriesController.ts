import { FastifyReply, FastifyRequest } from "fastify"
import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase"

class ListAllCategoriesController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user_id = request.userId

    const listCategories = new ListAllCategoriesUseCase()
    const categories = await listCategories.execute({ user_id })

    reply.send(categories)
  }
}
export { ListAllCategoriesController }
