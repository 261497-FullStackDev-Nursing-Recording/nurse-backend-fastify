import { FastifyInstance } from 'fastify';

import { UpdateFieldReq } from './types';

export async function updateAField(
    fastify: FastifyInstance,
    body: UpdateFieldReq,
    id: string,
) {
    const { message } = body;
    try {
        const field = await fastify.prisma.a_Field.update({
            where: {
                id: id,
            },
            data: {
                message: message,
            },
        });
        return field;
    } catch (err) {
        return err;
    }
}
export async function updateEField(
    fastify: FastifyInstance,
    body: UpdateFieldReq,
    id: string,
) {
    const { message } = body;
    try {
        const field = await fastify.prisma.e_Field.update({
            where: {
                id: id,
            },
            data: {
                message: message,
            },
        });
        return field;
    } catch (err) {
        return err;
    }
}
export async function updateIField(
    fastify: FastifyInstance,
    body: UpdateFieldReq,
    id: string,
) {
    const { message } = body;
    try {
        const field = await fastify.prisma.i_Field.update({
            where: {
                id: id,
            },
            data: {
                message: message,
            },
        });
        return field;
    } catch (err) {
        return err;
    }
}
export async function updateOField(
    fastify: FastifyInstance,
    body: UpdateFieldReq,
    id: string,
) {
    const { message } = body;
    try {
        const field = await fastify.prisma.o_Field.update({
            where: {
                id: id,
            },
            data: {
                message: message,
            },
        });
        return field;
    } catch (err) {
        return err;
    }
}
export async function updateSField(
    fastify: FastifyInstance,
    body: UpdateFieldReq,
    id: string,
) {
    const { message } = body;
    try {
        const field = await fastify.prisma.s_Field.update({
            where: {
                id: id,
            },
            data: {
                message: message,
            },
        });
        return field;
    } catch (err) {
        return err;
    }
}
