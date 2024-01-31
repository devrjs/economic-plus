import { FastifyReply, FastifyRequest } from "fastify"
import { SendEmailVerificationUseCase } from "./SendEmailVerificationUseCase"

class SendEmailVerificationController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user_id = request.userId

    const sendEmailVerificationUseCase = new SendEmailVerificationUseCase()
    await sendEmailVerificationUseCase.execute({ user_id })

    return reply.send()
  }
}

export { SendEmailVerificationController }
