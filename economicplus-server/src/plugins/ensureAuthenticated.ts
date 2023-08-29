import { FastifyRequest } from "fastify"

export async function ensureAuthenticated(request: FastifyRequest): Promise<void> {
  const { sub } = await request.jwtVerify<{ sub: string }>()

  request.userId = sub
}
