import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

const GetUsersResDTO = Type.Array(
    Type.Object({
        id: Type.String(),
        username: Type.String(),
        role: Type.String(),
        createdAt: Type.String(),
    }),
);

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: GetUsersResDTO,
            },
        },
        preHandler: fastify.auth([fastify.verifyAdmin]),
        handler: async (request, reply) => {
            try {
                const users = await fastify.prisma.user.findMany();
                return users;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });
};

export default users;
