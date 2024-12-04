import type { FastifyReply, FastifyRequest } from "fastify"
import { utils } from "../utils"
import { ERRORS } from "./errors.helper"

export const checkValidRequest = (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const token = utils.getTokenFromHeader(request.headers.authorization)
	if (!token) {
		return reply
			.code(ERRORS.unauthorizedAccess.statusCode)
			.send(ERRORS.unauthorizedAccess.message)
	}

	const decoded = utils.verifyToken(token)
	if (!decoded) {
		return reply
			.code(ERRORS.unauthorizedAccess.statusCode)
			.send(ERRORS.unauthorizedAccess.message)
	}
}

export const checkValidUser = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const token = utils.getTokenFromHeader(request.headers.authorization)
	if (!token) {
		return reply
			.code(ERRORS.unauthorizedAccess.statusCode)
			.send(ERRORS.unauthorizedAccess.message)
	}

	const decoded = utils.verifyToken(token)
	// @ts-ignore
	if (!decoded || !decoded.id) {
		return reply
			.code(ERRORS.unauthorizedAccess.statusCode)
			.send(ERRORS.unauthorizedAccess.message)
	}

	try {
		const userData = null
		if (!userData) {
			return reply
				.code(ERRORS.unauthorizedAccess.statusCode)
				.send(ERRORS.unauthorizedAccess.message)
		}
	} catch (e) {
		return reply
			.code(ERRORS.unauthorizedAccess.statusCode)
			.send(ERRORS.unauthorizedAccess.message)
	}
}
