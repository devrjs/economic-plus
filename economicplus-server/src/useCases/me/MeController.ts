import { FastifyReply, FastifyRequest } from "fastify"
import { MeUseCase } from "./MeUseCase"

class MeController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user_id = request.userId

    const userDataUseCase = new MeUseCase()
    const user = await userDataUseCase.execute({ user_id })

    reply.send(user)
  }
}

export { MeController }
