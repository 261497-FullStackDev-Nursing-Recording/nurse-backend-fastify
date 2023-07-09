import { FastifyPluginAsync } from 'fastify';

import { sseRouteHandler } from '../../plugins/sse/utils';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.route({
        method: 'GET',
        url: '/seedusers',
        handler: async (request, reply) => {
            try {
                await fastify.prisma.user.createMany({
                    data: [
                        {
                            username: 'admin',
                            password: await fastify.bcrypt.hash('admin'),
                            role: 'ADMIN',
                        },
                        {
                            username: 'user',
                            password: await fastify.bcrypt.hash('user'),
                            role: 'USER',
                        },
                    ],
                });
            } catch (err) {
                reply.code(500).send(err);
            }
            return { success: true };
        },
    });

    fastify.route({
        method: 'GET',
        url: '/sse',
        handler: sseRouteHandler,
    });

    fastify.route({
        method: 'GET',
        url: '/sse/send',
        handler: (request, reply) => {
            const { sseSubs } = fastify;
            sseSubs.forEach((sub) => {
                sub.broadcast({ data: 'Message from server', event: 'test' });
            });
            return 'ok';
        },
    });
};

export default root;
