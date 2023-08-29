import { compare } from "bcryptjs"
import { FastifyError } from "fastify"
import { prisma } from "../../lib/prisma"

interface IRequest {
  email: string
  password: string
}

type SignInPromise = {
  userId: string
  name: string
  accountStatus: string
}

class SignInUseCase {
  async execute({ email, password }: IRequest): Promise<SignInPromise> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      const error = new Error("E-mail or password incorrect!") as FastifyError
      error.statusCode = 401
      error.code = "not_found"
      throw error
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      const error = new Error("E-mail or password incorrect!") as FastifyError
      error.statusCode = 401
      error.code = "not_found"
      throw error
    }

    return { userId: user.id, name: user.name, accountStatus: user.accountStatus }
  }
}

export { SignInUseCase }
