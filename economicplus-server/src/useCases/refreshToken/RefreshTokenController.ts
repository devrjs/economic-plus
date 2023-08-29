import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"

class RefreshTokenController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const refreshTokenSchema = z.object({
      refresh_token: z.string(),
    })

    const { refresh_token } = refreshTokenSchema.parse(request.body)

    const refreshTokenUserUseCase = new RefreshTokenUseCase()
    const userId = await refreshTokenUserUseCase.execute({ refresh_token })

    const token = await reply.jwtSign({ userId }, { expiresIn: "1h" })

    reply.send({ token })
  }
}

export { RefreshTokenController }
