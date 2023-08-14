import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { createRecord, getRecords, updateRecord } from './services';
import { CreateRecordReq, GetRecordsReq, UpdateRecordReq } from './types';

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

    server.route({
        method: 'POST',
        url: '/search',
        schema: {
            body: GetRecordsReq,
        },
        handler: async (request, reply) => {
            const records = await getRecords(server, request.body);
            return records;
        },
    });
    server.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CreateRecordReq,
        },
        handler: async (request, reply) => {
            const record = await createRecord(server, request.body);
            return record.id;
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
            await updateRecord(server, request.body, record_id);
            return null;
        },
    });
};

export default records;
