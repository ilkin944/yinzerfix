import type { FastifyInstance } from "fastify"
import * as controllers from "@/controllers"

async function userRouter(fastify: FastifyInstance) {
	// fastify.get("/users", controllers.getAllUsers)
	// fastify.get("/user:/id", controllers.getUserById)
	// fastify.post("/user", controllers.createUser)
	// fastify.patch("/user", controllers.updateUser)
	// fastify.patch("/user/status/:id", controllers.updateUserStatus)
	// fastify.patch("/user:/id", controllers.updatePassword)
	// fastify.delete("/user", controllers.deleteUser)
}

export default userRouter
