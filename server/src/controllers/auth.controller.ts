import { STANDARD } from "../constants/request";
import { handleServerError } from "../helpers/errors.helper";
import Translator from "../models/translator.model";
import User from "../models/user.model";
import { IRoleEnum, IStatus, IUserStatus } from "../types";
import { generateAccessToken, generateRefreshToken, hashPassword, utils } from "../utils";
import { passwordResetTemplate } from "../utils/emailTemplates";
import type { FastifyReply, FastifyRequest } from "fastify"
import * as JWT from "jsonwebtoken"

export const checkAuth = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    try {
        const token = utils.getTokenFromHeader(request.headers.authorization)
        if (!token) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
        const decoded = utils.verifyToken(token);
        if (!decoded) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
        const userDetail = utils.decodeJwt(decoded as string) as { id: string, email: string, role: string }
        const user = await User.findById(userDetail.id)
        if (!user) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
        reply.code(STANDARD.OK.statusCode).send(user)
    } catch (error) {
        return handleServerError(reply, error)
    }
}
export const refreshToken = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const refreshToken = request.cookies.refreshToken
        if (!refreshToken) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
        const decoded = utils.verifyToken(refreshToken)
        if (!decoded || typeof decoded === 'string') {
            return reply.code(403).send({ message: 'Forbidden' })
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
        const newAccessToken = generateAccessToken(user.id, user.email, user.role)
        reply.code(200).send({ accessToken: newAccessToken })
    } catch (error) {
        return handleServerError(reply, error)
    }
}
export const Login = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    try {
        const { email, password } = request.body as { email: string, password: string }
        const user = await User.findOne({ email })
        if (!user) {
            return reply.code(401).send({ message: 'Invalid credentials' })
        }
        if (user.status === IUserStatus.BLOCKED) {
            return reply.code(401).send({ message: 'Account blocked' })
        }
        const isPasswordValid = await utils.compareHash(user.passwordHash, password)
        if (!isPasswordValid) {
            user.lastLoginTime = new Date()
            user.lastLoginIp = request.ip;
            user.loginFailCount += 1;
            if (user.loginFailCount >= 5) {
                user.status = IUserStatus.BLOCKED;
                await user.save();
            }
            await user.save()
            return reply.code(401).send({ message: 'Invalid credentials' })
        }
        const accessToken = generateAccessToken(user.id, user.email, user.role)
        const refreshToken = generateRefreshToken(user.id)
        user.lastLoginTime = new Date()
        user.lastLoginIp = request.ip;
        await user.save()
        reply
            .setCookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            .code(STANDARD.OK.statusCode)
            .send({ accessToken })
    } catch (error) {
        console.error(error)
        return handleServerError(reply, error)
    }

}

export const Register = async (
    request: FastifyRequest,
    reply: FastifyReply,
) => {
    try {
        const { email, password, role, firstName, lastName } = request.body as { email: string, password: string, role: string, firstName: string, lastName: string }
        const user = await User.findOne({ email })
        if (user) {
            return reply.code(400).send({ message: 'User already exists' })
        }
        const hashPass = await utils.genSalt(password);
        const createUser = new User({
            email,
            role,
            firstName,
            lastName
        })
        createUser.passwordHash = hashPass;
        if (role === IRoleEnum.TRANSLATOR) {
            createUser.role = IRoleEnum.TRANSLATOR
            const newTranslator = new Translator({
                uid: createUser._id
            })
            await newTranslator.save();
        } else {
            createUser.role = IRoleEnum.CUSTOMER
        }
        await createUser.save().catch((error) => {
            return error;
        });
        return reply.code(STANDARD.OK.statusCode).send('Successful register');
    } catch (error) {
        return reply.send(error)
    }
}

export const forgotPassword = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { email } = request.body as { email: string }
        const user = await User.findOne({ email })
        if (!user) {
            return reply.code(401).send({ message: 'User not found' })
        }
        const token = utils.generateToken(user.id, user.email, user.role)
        const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`
        const emailHtml = passwordResetTemplate(resetLink);
        await utils.sendEmail(user.email, 'Reset Password', emailHtml);
        reply.code(STANDARD.OK.statusCode).send({ message: 'Password reset link sent to your email' })
    } catch (error) {
        return reply.send(error)
    }
}

export const createPassword = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { token, password } = request.body as { token: string, password: string }
        const decoded = utils.verifyToken(token);
        if (!decoded) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
        const userDetail = JWT.decode(token as string) as { id: string, email: string, role: string }
        const user = await User.findById(userDetail.id)
        if (!user) {
            return reply.code(401).send({ message: 'Unauthorized' })
        }
        const hashPass = await utils.genSalt(password);
        user.passwordHash = hashPass;
        await user.save();

        reply.code(STANDARD.OK.statusCode).send({ message: 'Password created successfully' })
    } catch (error) {
        return reply.send(error)
    }
}
export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        reply
            .clearCookie('refreshToken', { path: '/' })
            .code(200)
            .send({ message: 'Logout successful' });
    } catch (error) {
        return reply.send(error)
    }
}