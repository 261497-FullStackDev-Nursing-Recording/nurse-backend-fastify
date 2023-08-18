import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { handleError } from '../../../utils/error';
import {
    createRecord,
    deleteRecord,
    getRecords,
    updateRecord,
} from './services';
import { CreateRecordReq, GetRecordsReq, UpdateRecordReq } from './types';

interface IParamRecord {
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
            tags: ['records'],
            description: 'Get Records',
            body: GetRecordsReq,
        },
        handler: async (request, reply) => {
            try {
                const records = await getRecords(server, request.body);
                return records;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });

    server.route({
        method: 'POST',
        url: '/',
        schema: {
            body: CreateRecordReq,
            description: 'Create Record with Fields',
            tags: ['records'],
        },
        handler: async (request, reply) => {
            try {
                const record = await createRecord(server, request.body);
                return record;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
    server.route({
        method: 'PUT',
        url: '/:record_id',
        schema: {
            description: 'Update Record',
            tags: ['records'],
            params: {
                type: 'object',
                properties: {
                    record_id: { type: 'string' },
                },
            },
            body: UpdateRecordReq,
        },
        handler: async (request, reply) => {
            const { record_id } = request.params as IParamRecord;
            try {
                await updateRecord(server, request.body, record_id);
                return null;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
    server.route({
        method: 'DELETE',
        url: '/:record_id',
        schema: {
            description: 'Delete Record',
            tags: ['records'],
            params: {
                type: 'object',
                properties: {
                    record_id: { type: 'string' },
                },
            },
        },
        handler: async (request, reply) => {
            const { record_id } = request.params as IParamRecord;
            try {
                await deleteRecord(server, record_id);
                return null;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
};

export default records;
