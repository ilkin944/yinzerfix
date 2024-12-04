import * as bcrypt from "bcryptjs"
import type { FastifyReply, FastifyRequest } from "fastify"
import type Joi from "joi"
import * as JWT from "jsonwebtoken"
import { IRoleEnum } from "./types"
import nodemailer from "nodemailer"
import { FastifyRedis } from "@fastify/redis"

export const utils = {
	isJSON: (data: string) => {
		try {
			JSON.parse(data)
		} catch (e) {
			return false
		}
		return true
	},

	generateToken: (id: string, email: string, role: IRoleEnum = IRoleEnum.CUSTOMER) => {
		const token = JWT.sign(
			{
				id,
				email,
				role
			},
			process.env.APP_JWT_SECRET as string,
		)
		return token;
	},

	getTime: (): number => {
		return new Date().getTime()
	},

	genSalt: (value: string): Promise<string> => {
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					reject(err);
					return;
				}
				bcrypt.hash(value, salt, (err, hash) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(hash);
				});
			});
		});
	},

	compareHash: (hash: string, value: string): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			bcrypt.compare(value, hash, (err, result) => {
				if (err) return reject(err)
				resolve(result)
			})
		})
	},

	healthCheck: async (): Promise<void> => {
		try {
			return null
		} catch (e) {
			throw new Error(`Health check failed: ${e.message}`)
		}
	},

	getTokenFromHeader: (
		authorizationHeader: string | undefined,
	): string | null => {
		if (!authorizationHeader) return null
		const token = authorizationHeader.replace("Bearer ", "")
		return token || null
	},

	verifyToken: (token: string): JWT.JwtPayload | string => {
		try {
			return JWT.verify(token, process.env.APP_JWT_SECRET as string)
		} catch (err) {
			return null
		}
	},

	decodeJwt: (token: string) => {
		return JWT.decode(token)
	},

	validateSchema: (schema: Joi.ObjectSchema) => {
		return (data: unknown) => {
			const { error } = schema.validate(data)
			if (error) {
				throw new Error(error.details[0].message)
			}
		}
	},

	preValidation: (schema: Joi.ObjectSchema) => {
		return (
			request: FastifyRequest,
			reply: FastifyReply,
			done: (err?: Error) => void,
		) => {
			const { error } = schema.validate(request.body)
			if (error) {
				return done(error)
			}
			done()
		}
	},

	sendEmail: async (to: string, subject: string, html: string) => {
		const transporter = nodemailer.createTransport({
			service: "Gmail",
			secure: true,
			host: "smtp.gmail.com",
			port: 465,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to,
			subject,
			html,
		}

		await transporter.sendMail(mailOptions)
	},

	invalidateRedisCache: async (redis: FastifyRedis, where: string) => {
		const keys = await redis.keys(`${where}:*`);
		if (keys.length > 0) {
			await redis.del(keys);
		}
	}
}

export const hashPassword = async (password: string) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
	const match = await bcrypt.compare(password, hashedPassword);
	return match;
};
(async () => {
	const password = 'yourPassword123';
	const hashedPassword = await hashPassword(password);
	const isMatch = await verifyPassword(password, hashedPassword);
})();



export const generateAccessToken = (id: string, email: string, role: IRoleEnum = IRoleEnum.CUSTOMER) => {
	const token = JWT.sign(
		{
			id,
			email,
			role
		},
		process.env.APP_JWT_SECRET as string,
	)
	return token;
};
export const generateRefreshToken = (id: string) => {
	const token = JWT.sign(
		{
			id,
		},
		process.env.APP_JWT_SECRET as string,
	)
	return token;
};