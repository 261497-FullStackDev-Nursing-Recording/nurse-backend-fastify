import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { searchRecords } from './services';
import { SearchRecordReq } from './types';

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
};

export default records;
