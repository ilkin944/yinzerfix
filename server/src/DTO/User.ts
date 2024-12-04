import Joi from "joi"

export interface IUserLoginDto {
	email: string
	password: string
}

export interface IUserSignupDto {
	email: string
	password: string
	firstName: string
	lastName: string
}

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
})

export const requestLoginSchema = {
	body: {
		type: "object",
		required: ["email", "password", ],
		properties: {
			email: { type: "string", format: "email" },
			password: { type: "string", minLength: 8 },
		},
	},
}

export const signupSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	repeatPassword: Joi.string().min(8).required(),
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	role: Joi.string().required(),
})

export const requestSignupSchema = {
	body: {
		type: "object",
		required: ["email", "password", "role"],
		properties: {
			email: { type: "string", format: "email" },
			password: { type: "string", minLength: 8 },
			repeatPassword: { type: "string", minLength: 8 },
			firstName: { type: "string" },
			lastName: { type: "string" },
			role: { type: "string" },
		},
	},
}
