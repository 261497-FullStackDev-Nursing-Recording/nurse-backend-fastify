import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { searchRecords, updateRecord } from './services';
import { SearchRecordReq, UpdateRecordReq } from './types';

interface IRecord {
    record_id: string;
}
const records: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

    // fastify.addHook('onRequest', async (request, reply) => {
    //     try {
    //         await request.jwtVerify();
    //     } catch (err) {
    //         reply.send(err);
    //     }
    // });

    // If you want to enforce schema, you need to use server.route instead of fastify.route.
    server.route({
        method: 'POST',
        url: '/search',
        schema: {
            body: SearchRecordReq,
        },
        handler: async (request, reply) => {
            const records = await searchRecords(server, request.body);
            return records;
        },
    });
    server.route({
        method: 'PUT',
        url: '/:record_id',
        schema: {
            params: {
                type: 'object',
                properties: {
                    record_id: { type: 'string' },
                },
            },
            body: UpdateRecordReq,
        },
        handler: async (request, reply) => {
            const { record_id } = request.params as IRecord;
            const records = await updateRecord(server, request.body, record_id);
            return records;
        },
    });
};

export default records;
