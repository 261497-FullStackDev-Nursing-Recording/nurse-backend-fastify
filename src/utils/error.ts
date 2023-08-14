import { FastifyReply } from 'fastify';

export const handleError = (
    reply: FastifyReply,
    statusCode: number,
    error: Error,
) => {
    console.error(error);
    reply
        .code(statusCode)
        .send({ error: 'An error occurred', details: error.message });
};
