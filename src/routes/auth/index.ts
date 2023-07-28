import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

const UserType = Type.Object({
    username: Type.String(),
    role: Type.String(),
});

const SignInReqDTO = Type.Object({
    username: Type.String(),
    password: Type.String(),
});

const SignInResDTO = Type.Object({
    accessToken: Type.String(),
    refreshToken: Type.String(),
    user: UserType,
});

const RefreshTokenResDTO = Type.Object({
    accessToken: Type.String(),
    user: UserType,
});

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

    server.route({
        method: 'GET',
        url: '/me',
        schema: {
            response: {
                200: UserType,
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
            body: SignInReqDTO,
            response: {
                200: SignInResDTO,
                401: Type.Object({ message: Type.String() }),
            },
        },
        handler: async (request, reply) => {
            const { username, password } = request.body as any;

            // Look up database
            const user = await fastify.prisma.user.findUnique({
                where: { username: username },
            });

            if (!user) {
                reply.code(401).send({ message: 'No username found' });
                return; //Typescript will complain if you don't return here
            }

            // Verify user
            const valid = await fastify.bcrypt.compare(password, user.password);

            if (!valid) {
                reply.code(401).send({
                    message: 'Incorrect username / password combination.',
                });
                return;
            }
            //to do expiresIn
            const accessToken = fastify.jwt.sign(user, {
                // expiresIn: '60m',
            });
            const refreshToken = fastify.jwt.sign(user, {
                expiresIn: '120m',
            });
            reply.send({ accessToken, refreshToken, user });
        },
    });

    server.route({
        method: 'POST',
        url: '/refreshtoken',
        schema: {
            response: {
                200: RefreshTokenResDTO,
            },
        },
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (request, reply) => {
            // For some reason, the user object contains iat and exp fields which I need to remove.
            const { iat, exp, ...userWithoutIatExp } = request.user;

            const accessToken = fastify.jwt.sign(userWithoutIatExp, {
                expiresIn: 'never',
            });

            reply.send({
                accessToken: accessToken,
                user: request.user,
            });
        },
    });

    server.route({
        method: 'GET',
        preHandler: fastify.auth([fastify.verifyJWT]),
        url: '/authenticated_route',
        handler: async (request, reply) => {
            reply.send({ message: 'You can access protected route.' });
        },
    });

    server.route({
        method: 'GET',
        preHandler: fastify.auth([fastify.verifyAdmin]),
        url: '/admin_route',
        handler: async (request, reply) => {
            reply.send({ message: 'You can access admin route.' });
        },
    });
};

export default auth;
