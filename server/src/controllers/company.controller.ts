import { STANDARD } from "@/constants/request";
import Company from "@/models/company.model"
import { ICompany } from "@/types";
import { utils } from "@/utils";
import { newCustomerRequest } from "@/utils/emailTemplates";
import type { FastifyReply, FastifyRequest } from "fastify"
const companyId = '673a2fae5bb0a78e179baffb'
export const AllCompanyData = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const company: ICompany = await Company.findById(companyId);
		const redis = request.server.redis;
		if (!redis) {
			throw new Error("Redis client not available");
		}
		const cachedData = await redis.get(`company`);
		if (cachedData) {
			return reply.send(JSON.parse(cachedData));
		}
		await redis.set(`company`, JSON.stringify(company), 'EX', 3600);
		return reply.status(200).send(company)
	} catch (error) {
		return reply.send(error)
	}
}
export const UpdateCompanyData = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const redis = request.server.redis;
		if (!redis) {
			throw new Error("Redis client not available");
		}
		const cachedData = await redis.get(`company`);
		if (cachedData) {
			return reply.send(JSON.parse(cachedData));
		}
		await utils.invalidateRedisCache(redis, "company");
		const updatedCompany = await Company.findByIdAndUpdate(companyId, request.body, { new: true });
		await redis.set(`company`, JSON.stringify(updatedCompany), 'EX', 3600);
		return reply.status(200).send(updatedCompany)
	} catch (error) {
		return reply.send(error)
	}
}
export const CreateCompany = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {

		const company = await Company.create(request.body);
		return reply.status(200).send(company)
	} catch (error) {
		return reply.send(error)
	}
}
export const AddCompanyAddress = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const redis = request.server.redis;
		if (!redis) {
			throw new Error("Redis client not available");
		}
		const cachedData = await redis.get(`company`);
		if (cachedData) {
			return reply.send(JSON.parse(cachedData));
		}
		const updatedCompany = await Company.findByIdAndUpdate(companyId, { $push: { addresses: request.body } }, { new: true });
		await utils.invalidateRedisCache(redis, "company");

		await redis.set(`company`, JSON.stringify(updatedCompany), 'EX', 3600);
		return reply.status(200).send(updatedCompany)
	} catch (error) {
		return reply.send(error)
	}
}
export const DeleteCompanyAddress = async (
	request: FastifyRequest,
	reply: FastifyReply) => {
	try {
		const { id } = request.params as { id: string };
		const redis = request.server.redis;
		if (!redis) {
			throw new Error("Redis client not available");
		}
		const cachedData = await redis.get(`company`);
		if (cachedData) {
			return reply.send(JSON.parse(cachedData));
		}
		const updatedCompany = await Company.findByIdAndUpdate(companyId, { $pull: { addresses: { id } } }, { new: true });
		await utils.invalidateRedisCache(redis, "company");
		await redis.set(`company`, JSON.stringify(updatedCompany), 'EX', 3600);
		return reply.status(200).send(updatedCompany)
	} catch (error) {
		return reply.send(error)
	}
}

export const CustomerRequest = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const reqBody = request.body as { fullName: string, phone: string, email: string, subject: string, address: string, zipCode: string, date: string, time: string }
		const companyEmail = process.env.COMPANY_EMAIL;
		const emailHtml = newCustomerRequest(reqBody);
		await utils.sendEmail(companyEmail, 'New Customer Request', emailHtml);
		reply.code(STANDARD.OK.statusCode).send({ message: 'Password reset link sent to your email' })
	} catch (error) {
		return reply.send(error)
	}
}