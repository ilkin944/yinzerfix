import type { FastifyInstance } from "fastify"
import * as controllers from "@/controllers"
import { loginSchema, requestLoginSchema, requestSignupSchema, signupSchema } from "@/DTO/User";
import { utils } from "@/utils";
async function authRouter(fastify: FastifyInstance) {
	// fastify.post(
	// 	"/auth/sign-in",
	// 	{
	// 		schema: requestLoginSchema,
	// 		preValidation: utils.preValidation(loginSchema),
	// 	},
	// 	controllers.Login,
	// );
	// fastify.post(
	// 	"/auth/sign-up",
	// 	{
	// 		schema: requestSignupSchema,
	// 		preValidation: utils.preValidation(signupSchema),
	// 	},
	// 	controllers.Register,
	// );
	// fastify.post("/auth/refresh-token", controllers.refreshToken);
	// fastify.post("/auth/forgot-password", controllers.forgotPassword);
	// fastify.post("/auth/reset-password", controllers.createPassword);
	// fastify.post("/auth/logout", controllers.logout);

}

export default authRouter
