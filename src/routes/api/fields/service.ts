import { FastifyInstance } from 'fastify';

import { CreateFieldsReq, UpdateFieldReq } from './types';

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
        throw err;
    }
}
export async function createFields(
    fastify: FastifyInstance,
    body: CreateFieldsReq,
) {
    try {
        const field = await fastify.prisma.field.createMany({
            data: body,
        });
        return field;
    } catch (err) {
        throw err;
    }
}
