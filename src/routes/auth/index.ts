import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { UserRes } from '../users/types';
import { signIn } from './services';
import { SignInReq } from './types';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

    server.route({
        method: 'GET',
        url: '/me',
        schema: {
            response: {
                200: UserRes,
            },
        },
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (request, reply) => {
            reply.send(request.user);
        },
    });

    server.route({
        method: 'POST',
        url: '/signin',
        schema: {
            body: SignInReq,
            response: {
                200: UserRes,
            },
        },

        handler: async (request, reply) => {
            const user = await signIn(fastify, request.body);
            const token = await reply.jwtSign({
                username: user.username,
                role: user.role,
            });
            reply
                .setCookie('access_token', token, {
                    domain: process.env.SITE_DOMAIN || 'localhost',
                    path: '/',
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                })
                .code(200)
                .send(user);
        },
    });

    server.route({
        method: 'GET',
        preHandler: fastify.auth([fastify.verifyJWT]),
        url: '/test/user',
        handler: async (request, reply) => {
            reply.send({ message: 'You can access protected route.' });
        },
    });

    server.route({
        method: 'GET',
        preHandler: fastify.auth([fastify.verifyAdmin]),
        url: '/test/admin',
        handler: async (request, reply) => {
            reply.send({ message: 'You can access admin route.' });
        },
    });
};

export default auth;
