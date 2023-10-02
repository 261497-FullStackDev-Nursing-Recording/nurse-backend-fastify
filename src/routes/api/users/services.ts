import { FastifyInstance } from 'fastify';

import type { SearchUserReq, UsersRes } from './types';

export async function searchUsers(
    fastify: FastifyInstance,
    body: SearchUserReq,
) {
    try {
        const users = await fastify.prisma.user.findMany({
            where: {
                ...body,
            },
        });
        return users as unknown as UsersRes;
    } catch (err) {
        throw err;
    }
}
