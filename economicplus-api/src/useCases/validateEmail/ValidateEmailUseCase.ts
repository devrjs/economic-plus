import dayjs from "dayjs"
import { FastifyError } from "fastify"
import { prisma } from "../../lib/prisma"

interface IResquest {
  verification_token: string
}

type ValidateEmailPromise = { userId: string; email: string; name: string; accountStatus: string }

class ValidateEmailUseCase {
  async execute({ verification_token }: IResquest): Promise<ValidateEmailPromise> {
    const tokens = await prisma.tokens.findFirst({
      where: {
        confirmationToken: verification_token,
      },
    })

    if (!tokens?.confirmationToken) {
      const error = new Error("Token invalid!") as FastifyError
      error.statusCode = 400
      throw error
    }

    const tokenExpired = dayjs().isAfter(dayjs.unix(Number(tokens.confirmationTokenExpiresOn)))

    if (tokenExpired) {
      const error = new Error("Token expired!") as FastifyError
      error.statusCode = 401
      throw error
    }

    const user = await prisma.user.update({
      where: {
        id: tokens.userId,
      },
      data: {
        accountStatus: "active",
      },
    })

    return { userId: user.id, name: user.name, email: user.email, accountStatus: user.accountStatus }
  }
}

export { ValidateEmailUseCase }
