import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResetPasswordUserUseCase } from "./ResetPasswordUseCase"

class ResetPasswordController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const resetPasswordDataSchema = z.object({
      verification_token: z.string(),
    })

    const { verification_token } = resetPasswordDataSchema.parse(request.body)

    const resetPasswordUserUseCase = new ResetPasswordUserUseCase()
    const { userId, name, email, accountStatus } = await resetPasswordUserUseCase.execute({
      verification_token,
    })

    const token = await reply.jwtSign({ sub: userId, email, name, accountStatus }, { expiresIn: "7d" })

    return reply.send({ token })
  }
}

export { ResetPasswordController }
