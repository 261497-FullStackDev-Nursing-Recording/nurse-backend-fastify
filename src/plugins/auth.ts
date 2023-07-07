import fastifyAuth from '@fastify/auth';
import fastifyJWT from '@fastify/jwt';
import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    fastify.register(fastifyJWT, { secret: process.env.JWT_SECRET });
    fastify.register(fastifyAuth);
    fastify.decorate('verifyJWT', verifyJWT);
    fastify.decorate('verifyAdmin', verifyAdmin);
    fastify.decorate('publicRoute', publicRoute);
});

async function verifyJWT(request: any, reply: any, done: any): Promise<any> {
    try {
        await request.jwtVerify();
        done();
    } catch (err) {
        reply.send(err);
    }
}

async function publicRoute(request: any, reply: any, done: any): Promise<any> {
    done();
}

async function verifyAdmin(request: any, reply: any, done: any): Promise<any> {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
    const role = request.user.role || 'GUEST';
    if (role !== 'ADMIN') {
        reply.code(401).send({ message: 'Unauthorized' });
    }
    done();
}

declare module 'fastify' {
    export interface FastifyInstance {
        verifyJWT(request: any, reply: any, done: any): Promise<void>;
        publicRoute(request: any, reply: any, done: any): Promise<void>;
        verifyAdmin(request: any, reply: any, done: any): Promise<void>;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { username: string; role: string }; // payload type is used for signing and verifying
        user: {
            username: string;
            role: string;
            iat: number;
            exp: number;
        }; // user type is return type of `request.user` object
    }
}
