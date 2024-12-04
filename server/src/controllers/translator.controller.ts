import Translator from "../models/translator.model";
import type { FastifyReply, FastifyRequest } from "fastify";
import { utils } from "@/utils";
import { ITranslator } from "@/types";

export const getAllTranslators = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const redis = request.server.redis;
    if (!redis) {
      throw new Error("Redis client not available");
    }

    const { page, limit } = request.query as { page: string; limit: string };
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const cacheKey = `translators:page=${pageNumber}:limit=${limitNumber}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return reply.send(JSON.parse(cachedData));
    }

    const total = await Translator.countDocuments();
    const totalPages = Math.ceil(total / limitNumber);
    const translators = await Translator.find()
      .skip(skip)
      .limit(limitNumber)
      .populate(['uid', 'languages', 'pendingProjects', 'completedProjects', 'rejectedProjects']);
    const refactored = translators.map(item => RefactorTranslatorData(item))
    const response = {
      translators: refactored,
      total,
      totalPages,
      pageNumber,
      limitNumber,
    };

    await redis.set(cacheKey, JSON.stringify(response), 'EX', 3600);
    reply.send(response);
  } catch (error) {
    return reply.send(error);
  }
};

export const getTranslator = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const redis = request.server.redis;
    const cacheKey = `translator:${id}`;
    const cachedTranslator = await redis.get(cacheKey);
    if (cachedTranslator) {
      return reply.send(JSON.parse(cachedTranslator));
    }
    const translator = await Translator.findById(id).populate(['uid', 'languages', 'pendingProjects', 'completedProjects', 'rejectedProjects']);
    if (!translator) {
      return reply.status(404).send({ message: 'Translator not found' });
    }
    const refactored = RefactorTranslatorData(translator);
    await redis.set(cacheKey, JSON.stringify(refactored), 'EX', 3600);

    reply.send(refactored);
  } catch (error) {
    return reply.send(error);
  }
};

export const addTranslator = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const body = request.body as ITranslator;

    const newTranslator = new Translator(body);
    await newTranslator.save();

    const redis = request.server.redis;
    await utils.invalidateRedisCache(redis, "translators");

    reply.status(201).send();
  } catch (error) {
    return reply.send(error);
  }
};

export const updateTranslator = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const body = request.body as ITranslator;

    const updatedTranslator = await Translator.findByIdAndUpdate(
      id,
      body,
      { new: true },
    );

    if (!updatedTranslator) {
      return reply.status(404).send({ message: 'Translator not found' });
    }

    const redis = request.server.redis;
    await utils.invalidateRedisCache(redis, "translators");
    await redis.del(`translator:${id}`);

    reply.status(201).send();
  } catch (error) {
    return reply.send(error);
  }
};

export const deleteTranslator = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };

    const deletedTranslator = await Translator.findByIdAndDelete(id);

    if (!deletedTranslator) {
      return reply.status(404).send({ message: 'Translator not found' });
    }

    const redis = request.server.redis;
    await utils.invalidateRedisCache(redis, "translators");
    await redis.del(`translator:${id}`);

    reply.status(200).send();
  } catch (error) {
    return reply.send(error);
  }
};

export const verifyTranslator = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: string };
    const updatedTranslator = await Translator.findByIdAndUpdate(
      id,
      { verificationStatus: status },
      { new: true },
    );
    if (!updatedTranslator) {
      return reply.status(404).send({ message: 'Translator not found' });
    }
    const redis = request.server.redis;
    await utils.invalidateRedisCache(redis, "translators");
    await redis.del(`translator:${id}`);
    reply.status(200).send();
  } catch (error) {
    return reply.send(error);
  }
}

const RefactorTranslatorData = (arg: any) => {
  return {
    id: arg._id,
    uid: {
      firstName: arg.uid.firstName,
      lastName: arg.uid.lastName,
      email: arg.uid.email,
      phoneNumber: arg.uid.phoneNumber,
      avatar: arg.uid.avatar,
      role: arg.uid.role,
      isEmailVerified: arg.uid.isEmailVerified,
      isPhoneVerified: arg.uid.isPhoneVerified,
      lastLoginTime: arg.uid.lastLoginTime,
      isVerified: arg.uid.isVerified,
    },
    role: arg.role,
    experienceYears: arg.experienceYears,
    qualifications: arg.qualifications,
    bio: arg.bio,
    status: arg.status,
    verificationStatus: arg.verificationStatus,
    verifyDetail: arg.verifyDetail,
    pendingProjects: arg.pendingProjects,
    completedProjects: arg.completedProjects,
    rejectedProjects: arg.rejectedProjects,
    education: arg.education,
    workExperience: arg.workExperience,
    certifications: arg.certifications,
    createdAt: arg.createdAt,
    updatedAt: arg.updatedAt,
    languages: arg.languages.map((item) => {
      return {
        id: item._id,
        name: item.name,
        code: item.code,
        flag: item.flag,
        status: item.status,
      };
    }),

  }
}