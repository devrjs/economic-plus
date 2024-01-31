import { FastifyError } from "fastify"
import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
}

class MeUseCase {
  async execute({ user_id }: IRequest): Promise<object> {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      const error = new Error("User not found!") as FastifyError
      error.statusCode = 404
      error.code = "not_found"
      throw error
    }

    return { name: user.name, email: user.email, accountStatus: user.accountStatus }
  }
}

export { MeUseCase }
