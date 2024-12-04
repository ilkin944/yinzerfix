import type { FastifyReply, FastifyRequest } from "fastify"
import * as JWT from "jsonwebtoken"
import { STANDARD } from "../constants/request"
import { ERRORS, handleServerError } from "../helpers/errors.helper"
import { utils } from "../utils"
import User from "../models/user.model"
import type { IUser } from "@/types"

export const getAllUsers = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const redis = request.server.redis;
		if (!redis) {
			throw new Error("Redis client not available");
		}
		const { page, limit } = request.query as { page: string; limit: string }
		const pageNumber = Number.parseInt(page) || 1
		const limitNumber = Number.parseInt(limit) || 10
		const skip = (pageNumber - 1) * limitNumber
		const total = await User.countDocuments()
		const totalPages = Math.ceil(total / limitNumber);
		const cacheKey = `users:page=${pageNumber}:limit=${limitNumber}`;
		const cachedData = await redis.get(cacheKey);
		if (cachedData) {
			return reply.send(JSON.parse(cachedData));
		}
		const users = await User.find()
			.skip(skip)
			.limit(limitNumber)
		const refactored = users.map(item => RefactorUserData(item));
		const response = {
			users: refactored,
			total,
			totalPages,
			pageNumber,
			limitNumber,
		};
		await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
		reply.code(STANDARD.OK.statusCode).send(response);
	} catch (err) {
		return reply.send(err)
	}

}

export const getUserById = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { id } = request.params as { id: string }
		const redis = request.server.redis;
		const cacheKey = `user:${id}`;
		const cachedUser = await redis.get(cacheKey);
		if (cachedUser) {
			return reply.send(JSON.parse(cachedUser));
		}
		const user = await User.findById(id);
		if (!user) {
			return reply.status(404).send({ message: 'User not found' });
		}
		const refactored = RefactorUserData(user);
		await redis.set(cacheKey, JSON.stringify(refactored), 'EX', 3600);

		reply.send(refactored);
	} catch (err) {
		return reply.send(err)
	}
}
export const createUser = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { email, password } = request.body as IUser & { password: string }

		const exsistUser = User.findOne({ email });
		if (exsistUser) {
			return reply.code(ERRORS.userExists.statusCode).send(ERRORS.userExists)
		}
		const hashPass = await utils.genSalt(password);
		const createUser = await User.create(request.body)
		const token = JWT.sign(
			{
				id: createUser.id,
				email: createUser.email,
				role: createUser.role
			},
			process.env.APP_JWT_SECRET as string,
		)
		createUser.passwordHash = hashPass;
		createUser.accessToken = token;
		createUser.refreshToken = token;
		await createUser.save()
		reply.code(STANDARD.CREATED.statusCode).send({
			token,
			user: createUser,
		});
	}
	catch (err) {
		return handleServerError(reply, err)
	}
}

export const updateUser = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { id } = request.params as { id: string }
		const user = await User.findById(id);

		if (!user) {
			return reply.code(ERRORS.userNotExists.statusCode).send(ERRORS.userNotExists.message)
		}
		const updateUser = User.findByIdAndUpdate(id, request.body, { new: true })
		reply.code(STANDARD.OK.statusCode).send(updateUser)
	}
	catch (err) {
		return handleServerError(reply, err)
	}
}

export const updateUserStatus = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { id } = request.params as { id: string }
		const user = await User.findById(id);
		const status = request.body as { status: string }
		if (!user) {
			return reply.code(ERRORS.userNotExists.statusCode).send(ERRORS.userNotExists.message)
		}
		const redis = request.server.redis;
		await utils.invalidateRedisCache(redis, "users");
		await redis.del(`user:${id}`);
		const updateUser = await User.findByIdAndUpdate(id, status, { new: true })
		reply.code(STANDARD.OK.statusCode).send(updateUser)
	}
	catch (err) {
		return reply.send(err)
	}
}

export const updatePassword = async (request: FastifyRequest,
	reply: FastifyReply,) => {
	try {
		const { id } = request.params as { id: string }
		const { currentPassword, newPassword } = request.body as { currentPassword: string, newPassword: string }
		const user = await User.findById(id)
		if (!user) {
			return reply.code(ERRORS.userNotExists.statusCode).send(ERRORS.userNotExists.message)
		}
		if (!user.passwordHash) {
			return reply.code(ERRORS.userNotExists.statusCode).send(ERRORS.userNotExists.message)
		}
		const oldPassHash = await utils.genSalt(currentPassword)
		const checkPass = await utils.compareHash(oldPassHash, user.passwordHash);
		if (!checkPass) {
			return reply.code(ERRORS.userCredError.statusCode).send(ERRORS.userCredError.message)
		}
		const hashPass = await utils.genSalt(newPassword);
		user.passwordHash = hashPass;
		await user.save();
		reply.code(STANDARD.OK.statusCode).send({ message: 'Password updated successfully' })
	}
	catch (err) {
		return handleServerError(reply, err)
	}
}


export const deleteUser = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { id } = request.params as { id: string }
		const user = null
		if (!user) {
			return reply.code(ERRORS.userNotExists.statusCode).send(ERRORS.userNotExists.message)
		}
		await User.findByIdAndDelete(id)
		reply.code(STANDARD.OK.statusCode).send({ message: 'User deleted successfully' })
	}
	catch (err) {
		return handleServerError(reply, err)
	}
}

const RefactorUserData = (user: IUser) => {
	return {
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		phone: user.phone,
		avatar: user.avatar,
		role: user.role,
		status: user.status,
		createdAt: user.createdAt,
		isEmailVerified: user.isEmailVerified,
		isPhoneVerified: user.isPhoneVerified,
		lastLoginTime: user.lastLoginTime,
		lastLoginIp: user.lastLoginIp,
		loginFailCount: user.loginFailCount,
		isVerified: user.isVerified
	}
}