import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { EditUserUseCase } from "./EditUserUseCase"

class EditUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userDataSchema = z.object({
      name: z.string().optional(),
      password: z.string().optional(),
    })

    const { name, password } = userDataSchema.parse(request.body)

    const user_id = request.userId

    const editUser = new EditUserUseCase()
    await editUser.execute({ user_id, name, password })

    reply.send()
  }
}

export { EditUserController }
