import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { searchUsers } from './services';
import { SearchUserReq, UsersRes } from './types';

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

    // fastify.addHook('onRequest', async (request, reply) => {
    //     try {
    //         await request.jwtVerify();
    //     } catch (err) {
    //         reply.send(err);
    //     }
    // });

    server.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {
                200: UsersRes,
            },
        },
        // preHandler: fastify.auth([fastify.verifyAdmin]),
        handler: async function (request, reply) {
            const users = await searchUsers(server, {});
            return users;
        },
    });

    server.route({
        method: 'POST',
        url: '/',
        schema: {
            body: SearchUserReq,
            response: {
                200: UsersRes,
            },
        },
        // preHandler: fastify.auth([fastify.verifyAdmin]),
        handler: async function (request, reply) {
            const users = await searchUsers(server, request.body);
            return users;
        },
    });
};

export default users;
