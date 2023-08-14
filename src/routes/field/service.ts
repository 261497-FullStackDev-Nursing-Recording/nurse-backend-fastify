import { FastifyInstance } from 'fastify';

import { UpdateFieldReq } from './types';

export async function updateField(
    fastify: FastifyInstance,
    body: UpdateFieldReq,
    id: string,
) {
    try {
        const field = await fastify.prisma.field.update({
            where: {
                id: id,
            },
            data: body,
        });
        return field;
    } catch (err) {
        return err;
    }
}
