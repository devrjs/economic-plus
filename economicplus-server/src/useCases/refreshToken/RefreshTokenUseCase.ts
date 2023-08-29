import dayjs from "dayjs"
import { FastifyError } from "fastify"
import { prisma } from "../../lib/prisma"

interface IRequest {
  refresh_token: string
}

class RefreshTokenUseCase {
  async execute({ refresh_token }: IRequest): Promise<string> {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    })

    if (!refreshToken) {
      const error = new Error("RefreshToken invalid!") as FastifyError
      error.statusCode = 400
      throw error
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    if (refreshTokenExpired) {
      const error = new Error("RefreshToken expired!") as FastifyError
      error.statusCode = 401
      throw error
    }

    return refreshToken.userId
  }
}

export { RefreshTokenUseCase }
