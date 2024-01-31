import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { SignInUseCase } from "./SignInUseCase"

class SignInController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const signInDataSchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = signInDataSchema.parse(request.body)

    const signInUseCase = new SignInUseCase()
    const { userId, name, accountStatus } = await signInUseCase.execute({ email, password })

    const token = await reply.jwtSign({ sub: userId, email, name, accountStatus }, { expiresIn: "7d" })

    return reply.send({ token })
  }
}

export { SignInController }
