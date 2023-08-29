import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { SignUpUseCase } from "./SignUpUseCase"

class SignUpController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const signUpDataSchema = z.object({
      email: z.string(),
      name: z.string(),
      password: z.string(),
    })

    const { email, name, password } = signUpDataSchema.parse(request.body)

    const signUpUseCase = new SignUpUseCase()
    const { userId, accountStatus } = await signUpUseCase.execute({ email, name, password })

    const token = await reply.jwtSign({ sub: userId, email, name, accountStatus }, { expiresIn: "7d" })

    return reply.send({ token })
  }
}

export { SignUpController }
