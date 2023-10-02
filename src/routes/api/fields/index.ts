import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { handleError } from '../../../utils/error';
import { createFields, updateField } from './service';
import { CreateFieldsReq, UpdateFieldReq } from './types';

interface IParamField {
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
        url: '/:field_id',
        schema: {
            body: UpdateFieldReq,
            description: 'Update field',
            tags: ['fields'],
            params: {
                type: 'object',
                properties: {
                    field_id: { type: 'string' },
                },
            },
        },
        handler: async (request, reply) => {
            const { field_id } = request.params as IParamField;
            try {
                await updateField(server, request.body, field_id);
                return null;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
    server.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CreateFieldsReq,
            description: 'Create fields',
            tags: ['fields'],
        },
        handler: async (request, reply) => {
            try {
                await createFields(server, request.body);
                return null;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
};

export default fields;
