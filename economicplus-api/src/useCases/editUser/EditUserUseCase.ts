import { hash } from "bcryptjs"
import { prisma } from "../../lib/prisma"

interface IRequest {
  user_id: string
  name?: string
  password?: string
}

class EditUserUseCase {
  async execute({ name, password, user_id }: IRequest): Promise<void> {
    const passwordHash = password && (await hash(password, 8))

    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        name: name,
        password: passwordHash,
      },
    })
  }
}

export { EditUserUseCase }
