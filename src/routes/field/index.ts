import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { updateAField } from './service';
import { UpdateFieldReq } from './types';

interface IField {
    field_id: string;
}
const fields: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

    // fastify.addHook('onRequest', async (request, reply) => {
    //     try {
    //         await request.jwtVerify();
    //     } catch (err) {
    //         reply.send(err);
    //     }
    // });
    server.route({
        method: 'PUT',
        url: '/a-field/:field_id',
        schema: {
            params: {
                type: 'object',
                properties: {
                    field_id: { type: 'string' },
                },
            },
            body: UpdateFieldReq,
        },
        handler: async (request, reply) => {
            try {
                const { field_id } = request.params as IField;
                await updateAField(server, request.body, field_id);
                return null;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });
    server.route({
        method: 'PUT',
        url: '/e-field/:field_id',
        schema: {
            params: {
                type: 'object',
                properties: {
                    field_id: { type: 'string' },
                },
            },
            body: UpdateFieldReq,
        },
        handler: async (request, reply) => {
            try {
                const { field_id } = request.params as IField;
                await updateAField(server, request.body, field_id);
                return null;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });
    server.route({
        method: 'PUT',
        url: '/i-field/:field_id',
        schema: {
            params: {
                type: 'object',
                properties: {
                    field_id: { type: 'string' },
                },
            },
            body: UpdateFieldReq,
        },
        handler: async (request, reply) => {
            try {
                const { field_id } = request.params as IField;
                await updateAField(server, request.body, field_id);
                return null;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });
    server.route({
        method: 'PUT',
        url: '/o-field/:field_id',
        schema: {
            params: {
                type: 'object',
                properties: {
                    field_id: { type: 'string' },
                },
            },
            body: UpdateFieldReq,
        },
        handler: async (request, reply) => {
            try {
                const { field_id } = request.params as IField;
                await updateAField(server, request.body, field_id);
                return null;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });
    server.route({
        method: 'PUT',
        url: '/s-field/:field_id',
        schema: {
            params: {
                type: 'object',
                properties: {
                    field_id: { type: 'string' },
                },
            },
            body: UpdateFieldReq,
        },
        handler: async (request, reply) => {
            try {
                const { field_id } = request.params as IField;
                await updateAField(server, request.body, field_id);
                return null;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });
};
export default fields;
