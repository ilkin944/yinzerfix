import type { FastifyInstance } from "fastify"
import * as controllers from "@/controllers"

async function companyRouter(fastify: FastifyInstance) {
	fastify.post("/request", controllers.CustomerRequest)
}

export default companyRouter
