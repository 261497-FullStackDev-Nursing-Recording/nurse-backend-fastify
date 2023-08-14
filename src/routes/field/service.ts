import { FastifyInstance } from 'fastify';

import { CreateFieldsReq, UpdateFieldReq } from './types';

export async function createFields(
    fastify: FastifyInstance,
    body: CreateFieldsReq,
) {
    try {
        const fields = await fastify.prisma.field.createMany({
            data: body,
        });
        return fields;
    } catch (err) {
        return err;
    }
}
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
