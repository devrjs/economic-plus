import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import "dotenv/config"
import fastify from "fastify"
import { router } from "./router"

const app = fastify()

app.register(cors, {
  origin: true,
  exposedHeaders: ["X-Total-Count"],
})

app.register(jwt, {
  secret: process.env.JWT_SECRET_KEY as string,
})

app.register(router)

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333")
  })
