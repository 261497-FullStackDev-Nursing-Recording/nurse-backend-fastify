import { FastifyPluginAsync } from 'fastify';

import { sseRouteHandler } from '../../plugins/sse/utils';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
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
