import fs from 'fs';
import path from 'path';
import { FastifyInstance, FastifyRequest } from 'fastify';

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFilePath = path.join(logDir, 'requests.log');
const maxLogSize = 5 * 1024 * 1024;

export const appendLog = (data: string) => {
    if (fs.existsSync(logFilePath)) {
        const stats = fs.statSync(logFilePath);
        if (stats.size >= maxLogSize) {
            const rotatedPath = path.join(__dirname, `logs/requests-${Date.now()}.log`);
            fs.renameSync(logFilePath, rotatedPath);
        }
    }
    fs.appendFileSync(logFilePath, `${data}\n`, { encoding: 'utf8', mode: 0o600 });
};


const requestResponseLogger = async (fastify: FastifyInstance) => {
    fastify.addHook('onRequest', async (request: FastifyRequest) => {
        const logEntry = `REQUEST - ${new Date().toISOString()}:
        Method: ${request.method}
        URL: ${request.url}
        Headers: ${JSON.stringify(request.headers)}
        Body: ${JSON.stringify(request.body)}`;
        console.log('Request received:', logEntry);
        appendLog(logEntry);
    });

    fastify.addHook('onSend', async (request, reply, payload) => {
        const logData = {
            type: 'response',
            timestamp: new Date().toISOString(),
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
            headers: reply.getHeaders(),
            response: payload,
        };
        console.log('Response sent:', logData);
        appendLog(JSON.stringify(logData));
    });
    fastify.addHook('onError', async (request, reply, error) => {
        const logData = {
            type: 'error',
            timestamp: new Date().toISOString(),
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
            headers: reply.getHeaders(),
            error: error.message,
        };
        console.log('Error occurred:', logData);
        appendLog(JSON.stringify(logData));
    });
};

export default requestResponseLogger;
