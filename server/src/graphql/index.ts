import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import mercurius from "mercurius"
import resolvers from "./resolvers"
import schema from "./schema"
const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => ({
	authorization: req.headers.authorization,
})

export async function initGraphql(app: FastifyInstance) {
	try {
		await app.register(mercurius, {
			schema,
			graphiql: "graphiql",
			ide: false,
			path: "/graphql",
			allowBatchedQueries: true,
			context: buildContext,
		})
	} catch (err: unknown) {
		app.log.error(err)
	}
}
