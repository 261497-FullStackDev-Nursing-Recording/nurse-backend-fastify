import { FastifyInstance } from 'fastify';

import { UserRes } from '../users/types';
import { type SignInReq } from './types';

export async function me(fastify: FastifyInstance, username: string) {
    const users = await fastify.prisma.user.findMany({
        where: {
            username,
        },
    });
    if (users.length === 0)
        throw fastify.httpErrors.unauthorized('No username found');

    // Also check for duplicate usernames
    if (users.length > 1)
        throw fastify.httpErrors.unauthorized('Duplicate usernames found');

    return users[0] as unknown as UserRes;
}

export async function signIn(fastify: FastifyInstance, body: SignInReq) {
    const { username, password } = body;

    // Look up database
    const users = await fastify.prisma.user.findMany({
        where: {
            username,
        },
    });

    if (users.length === 0)
        throw fastify.httpErrors.unauthorized('No username found');

    // Also check for duplicate usernames
    if (users.length > 1)
        throw fastify.httpErrors.unauthorized('Duplicate usernames found');

    const user = users[0];
    // Verify user
    const valid = await fastify.bcrypt.compare(password, user.password);

    if (!valid)
        throw fastify.httpErrors.unauthorized(
            'Incorrect username / password combination.',
        );

    const { password: _, ...rest } = user;
    return rest as unknown as UserRes;
}
