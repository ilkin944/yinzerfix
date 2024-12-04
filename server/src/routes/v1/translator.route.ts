import type { FastifyInstance } from "fastify"
import * as controllers from "@/controllers"
async function translatorRouter(fastify: FastifyInstance) {
	// fastify.get("/translator", controllers.getAllTranslators)
	// fastify.get("/translator/:id", controllers.getTranslator)
	// fastify.post("/translator", controllers.addTranslator)
	// fastify.patch("/translator/verify/:id", controllers.verifyTranslator)
	// fastify.patch("/translator/:id", controllers.updateTranslator)
	// fastify.delete("/translator/:id", controllers.deleteTranslator)
}

export default translatorRouter
