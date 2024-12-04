import { FastifyRedis } from "@fastify/redis";
import "fastify"

declare module "fastify" {
	interface FastifyRequest {
		authUser?: {
			id: number
			email: string
		}
	}
	interface FastifyInstance {  
		redis: FastifyRedis;
	  }
}