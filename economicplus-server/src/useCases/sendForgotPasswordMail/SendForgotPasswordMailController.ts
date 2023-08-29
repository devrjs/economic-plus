import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

class SendForgotPasswordMailController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const forgotPasswordDataSchema = z.object({
      email: z.string(),
    })

    const { email } = forgotPasswordDataSchema.parse(request.body)

    const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase()
    await sendForgotPasswordMailUseCase.execute({ email })

    return reply.send()
  }
}

export { SendForgotPasswordMailController }
