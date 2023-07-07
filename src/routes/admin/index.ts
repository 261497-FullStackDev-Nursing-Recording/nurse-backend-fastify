import { FastifyPluginAsync } from 'fastify';

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
                            password: 'admin',
                            role: 'ADMIN',
                        },
                        {
                            username: 'user',
                            password: 'user',
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
};

export default root;
