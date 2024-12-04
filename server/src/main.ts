import type { AutoloadPluginOptions } from "@fastify/autoload"
import fastify, { FastifyRequest } from "fastify"
import FastifySSEPlugin from "fastify-sse-v2"
import type { PinoLoggerOptions } from "fastify/types/logger"
import connectDB from "./config/db"
import loadConfig from "./config/env.config"
import { utils } from "./utils"
import MongoDBSanitizer from "./utils/dbSanitize"
import routesRegister from "./routes"
import Redis from 'ioredis'
import fastifyRedis from "@fastify/redis"
import jwt from "@fastify/jwt"
import cors from "@fastify/cors"
import env from "@fastify/env"
import etag from "@fastify/etag"
import helmet from "@fastify/helmet"
import rateLimit from "@fastify/rate-limit"
import sensible from "@fastify/sensible"
import underPressure from "@fastify/under-pressure"
import fastifyWebSocket from "@fastify/websocket"
import stripe from "fastify-stripe"
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { EventEmitter } from "node:stream"
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import requestResponseLogger, { appendLog } from "./utils/Logger"
const schema = {
	type: "object",
	required: ["PORT"],
	properties: {
		PORT: {
			type: "string",
			default: 5100,
		},
		NODE_ENV: {
			type: "string",
			default: "development",
		},
		LOG_LEVEL: {
			type: "string",
			default: "debug",
		},
		REDIS_URL: {
			type: "string",
		},
		API_HOST: {
			type: "string",
		},
		API_PORT: {
			type: "string",
		},
		JWT_SECRET: {
			type: "string",
		},
		APP_JWT_SECRET: {
			type: "string",
		},
		DATABASE_URL: {
			type: "string",
		},
		MONGO_URI: {
			type: "string",
		},
		MONGODB_USERNAME: {
			type: "string",
		},
		MONGODB_PASSWORD: {
			type: "string",
		},
		STRIPE_SECRET_KEY: {
			type: "string",
			default: process.env.STRIPE_SECRET_KEY,
		},
	},
}

const options = {
	confKey: "config",
	schema,
	dotenv: true,
}


export type AppOptions = {
	// Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>
loadConfig()

const port = Number(process.env.API_PORT) || 5001
const host = String(process.env.API_HOST);

const startServer = async () => {
	const logger: PinoLoggerOptions = {
		name: "YinzerFIX Log",
		level: process.env.LOG_LEVEL || "debug",
		formatters: {
			level: (label) => {
				return { level: label }
			},
		},
	}
	const server = fastify({
		logger,
	})
	connectDB()



	server.register(routesRegister)
	server.register(MongoDBSanitizer)
	server.register(FastifySSEPlugin);
	const client = new Redis({ host: 'localhost', port: 6379 })
	server.register(env, options)
	server.register(cors, {
		origin: 'http://localhost:3000',
		credentials: true
	})
	server.register(etag)
	server.register(fastifyRedis, { client, url: '127.0.0.1:6379' }).ready(err => {
		if (err) {
			server.log.error('Failed to connect to Redis', err);
		} else {
			server.log.info('Redis connected successfully');
		}
	});
	server.register(jwt, { secret: process.env.JWT_SECRET })
	// server.addHook("onRequest", async (request, reply) => {
	// 	try {
	// 		await request.jwtVerify()
	// 	} catch (err) {
	// 		reply.send(err)
	// 	}
	// })
	server.register(helmet)

	server.register(rateLimit, {
		max: 100,
		timeWindow: "1 minute",
	})
	server.register(sensible);
	server.register(stripe, {
		apiKey: process.env.STRIPE_SECRET_KEY,
		name: "test",
	})
	server.register(cookie, {
		secret: "my-secret", // for cookies signature
		parseOptions: {}     // options for parsing cookies
	} as FastifyCookieOptions)
	process.setMaxListeners(1111111110);
	EventEmitter.setMaxListeners()
	// server.register(underPressure, {
	// 	maxEventLoopDelay: 1000,
	// 	maxHeapUsedBytes: 100000000,
	// 	maxRssBytes: 100000000,
	// 	maxEventLoopUtilization: 0.98,
	// 	retryAfter: 50,
	// 	pressureHandler: (request, reply, type, value) => {
	// 		if (type === underPressure.TYPE_HEAP_USED_BYTES) {
	// 			server.log.warn(`too many heap bytes used: ${value}`)
	// 		} else if (type === underPressure.TYPE_RSS_BYTES) {
	// 			server.log.warn(`too many rss bytes used: ${value}`)
	// 		}

	// 		reply.send('out of memory')
	// 	}
	// })
	server.register(fastifyWebSocket);

	// Set error handler
	server.setErrorHandler((error, _request, reply) => {
		server.log.error(error)
		reply.status(500).send(error)
	})
	// Sentry.init({
	// 	dsn: "https://c24c523cecf4719dcfbf39fa5efae31a@o4508125978886144.ingest.us.sentry.io/4508125983080448",
	// 	integrations: [
	// 		// Add our Profiling integration
	// 		nodeProfilingIntegration(),
	// 	],

	// 	// Add Tracing by setting tracesSampleRate
	// 	// We recommend adjusting this value in production
	// 	tracesSampleRate: 1.0,

	// 	// Set sampling rate for profiling
	// 	// This is relative to tracesSampleRate
	// 	profilesSampleRate: 1.0,
	// });
	// Health check route
	server.get("/health", async (_request, reply) => {
		try {
			await utils.healthCheck()
			reply.status(200).send({
				message: "Health check endpoint success.",
			})
		} catch (e) {
			reply.status(500).send({
				message: "Health check endpoint failed.",
			})
		}
	})

	const html = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
			</head>
			<body>
				Hello
			</body>
			</html>`
	// Root route
	server.get("/", (request, reply) => {
		reply.status(200).type("text/html").send(html)
	})

	// Graceful shutdown
	const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"]
	for (const signal of signals) {
		process.on(signal, async () => {
			try {
				await server.close()
				server.log.error(`Closed application on ${signal}`)
				process.exit(0)
			} catch (err) {
				server.log.error(`Error closing application on ${signal}`, err)
				process.exit(1)
			}
		})
	}
	// Start server
	try {
		await server.listen({
			port,
			host,
		})
		server.log.info(`Server listening on ${host}:${port}`)
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
	console.error("Unhandled Rejection:", err)
	process.exit(1)
})

startServer()
