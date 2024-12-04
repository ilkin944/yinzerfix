import type { FastifyInstance, FastifyRequest } from "fastify"

const isValueObject = (o: object) => typeof o === "object" && o !== null

const startsWith$ = (v: string) => typeof v === "string" && v.startsWith("$")

const sanatizeValues = (inp) => {
	if (startsWith$(inp)) return undefined

	if (!isValueObject(inp)) return inp

	if (Array.isArray(inp)) {
		return inp.reduce((arrR, v) => {
			if (isValueObject(v)) {
				arrR.push(sanatizeValues(v))
				return arrR
			}
			if (!startsWith$(v)) {
				arrR.push(v)
			}
			return arrR
		}, [])
	}

	return Object.entries(inp)
		.filter(([k, v]: any) => {
			if (startsWith$(k) || startsWith$(v)) return false
			return true
		})
		.reduce((objR, [k, v]) => {
			if (isValueObject(v as object)) {
				objR[k] = sanatizeValues(v)
				return objR
			}
			objR[k] = v
			return objR
		}, {})
}

export default function MongoDBSanitizer(
	fastify: FastifyInstance,
	request: FastifyRequest,
	done: () => void,
) {
	fastify.addHook("preHandler", async (req) => {
		if (request.params) {
			req.params = sanatizeValues(req.params)
		}
		if (request.query) {
			req.query = sanatizeValues(req.query)
		}
		if (request.body) {
			req.body = sanatizeValues(req.body)
		}
	})
	done()
}
