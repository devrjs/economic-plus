import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ValidateEmailUseCase } from "./ValidateEmailUseCase"

class ValidateEmailController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const validateEmailDataSchema = z.object({
      verification_token: z.string(),
    })

    const { verification_token } = validateEmailDataSchema.parse(request.body)

    const verifyEmailUseCase = new ValidateEmailUseCase()
    const { userId, email, name, accountStatus } = await verifyEmailUseCase.execute({ verification_token })

    const token = await reply.jwtSign({ sub: userId, email, name, accountStatus }, { expiresIn: "7d" })

    return reply.send({ token })
  }
}

export { ValidateEmailController }
