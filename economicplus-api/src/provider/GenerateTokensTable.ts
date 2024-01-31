import { prisma } from "../lib/prisma"

class GenerateTokensTable {
  async execute(user_id: string): Promise<void> {
    await prisma.tokens.create({
      data: {
        userId: user_id,
      },
    })
  }
}

export { GenerateTokensTable }
