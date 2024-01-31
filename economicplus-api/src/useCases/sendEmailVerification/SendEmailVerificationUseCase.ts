import dayjs from "dayjs"
import { FastifyError } from "fastify"
import { randomUUID } from "node:crypto"
import { resolve } from "node:path"
import { prisma } from "../../lib/prisma"
import { GenerateEmail } from "../../provider/GenerateEmail"
import { GenerateTokensTable } from "../../provider/GenerateTokensTable"

interface IRequest {
  user_id: string
}

class SendEmailVerificationUseCase {
  async execute({ user_id }: IRequest): Promise<void> {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      const error = new Error("User does not exists!") as FastifyError
      error.statusCode = 404
      error.code = "not_found"
      throw error
    }

    const tokensTableExists = await prisma.tokens.findFirst({
      where: {
        userId: user.id,
      },
    })

    if (!tokensTableExists) {
      const generateTokensTable = new GenerateTokensTable()
      await generateTokensTable.execute(user.id)
    }

    const token = await prisma.tokens.update({
      where: {
        userId: user.id,
      },
      data: {
        confirmationToken: randomUUID(),
        confirmationTokenExpiresOn: dayjs().add(15, "minutes").unix(),
      },
    })

    const variables = {
      name: user.name,
      link: `${process.env.CLIENT_URL}/api/auth/verify?token=${token.confirmationToken}`,
    }

    const emailProps = {
      to: user.email,
      subject: "Verificação de Conta",
      variables: variables,
      path: resolve(__dirname, "../../views/emailVerification.hbs"),
    }

    const email = new GenerateEmail()
    await email.sendEmail(emailProps)
  }
}

export { SendEmailVerificationUseCase }
