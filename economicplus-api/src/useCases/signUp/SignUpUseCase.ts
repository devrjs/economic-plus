import { hash } from "bcryptjs"
import { FastifyError } from "fastify"
import { prisma } from "../../lib/prisma"
import { SendEmailVerificationUseCase } from "../sendEmailVerification/SendEmailVerificationUseCase"

interface IRequest {
  name: string
  email: string
  password: string
}

type SignUpPromise = { userId: string; accountStatus: string }

class SignUpUseCase {
  async execute({ email, name, password }: IRequest): Promise<SignUpPromise> {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    })

    if (user) {
      const error = new Error("User already exists!") as FastifyError
      error.statusCode = 400
      throw error
    }

    const passwordHash = await hash(password, 8)

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: passwordHash,
      },
    })

    const sendEmailVerificationUseCase = new SendEmailVerificationUseCase()
    await sendEmailVerificationUseCase.execute({ user_id: newUser.id })

    return { userId: newUser.id, accountStatus: newUser.accountStatus }
  }
}

export { SignUpUseCase }
