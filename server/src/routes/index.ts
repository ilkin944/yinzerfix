import { FastifyInstance, FastifyPluginOptions } from "fastify"
import authRouter from "./v1/auth.route"
import translatorRouter from "./v1/translator.route"
import userRouter from "./v1/user.router"
import companyRouter from "./v1/company.route"

export * from "./v1/auth.route"
export * from "./v1/translator.route"
export * from "./v1/company.route"
export * from "./v1/user.router"

export default function routesRegister(
	server: FastifyInstance,
	opts: FastifyPluginOptions,
	done: () => void,
) {
	server.register(authRouter, { prefix: 'api/v1/' })
	server.register(translatorRouter, { prefix: 'api/v1/' })
	server.register(userRouter, { prefix: 'api/v1/' });
	server.register(companyRouter, { prefix: 'api/v1/' });

	done()
}
