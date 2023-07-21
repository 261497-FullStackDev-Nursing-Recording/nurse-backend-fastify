import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { searchRecords } from './services';
import { GetRecordsRes, SearchRecordReq } from './types';

// const GetRecordsResDTO = Type.Array(
//     Type.Object({
//         user_id: Type.String(),
//         patient_id: Type.String(),
//         bed_number: Type.Integer(),
//         ward: Type.String(),
//         diagnose: Type.String(),
//         shift: Type.String(),
//         visit_number: Type.String(),
//         created_at: Type.String(),
//         modified_at: Type.String(),
//     }),
// );
// const GetRecordsInformationResDTO = Type.Array(
//     Type.Object({
//         user_id: Type.String(),
//         patient_id: Type.String(),
//         bed_number: Type.Integer(),
//         ward: Type.String(),
//         diagnose: Type.String(),
//         shift: Type.String(),
//         visit_number: Type.String(),
//         created_at: Type.String(),
//         modified_at: Type.String(),
//         a_field: Type.Array(
//             Type.Object({
//                 message: Type.String(),
//             }),
//         ),
//         e_field: Type.Array(
//             Type.Object({
//                 message: Type.String(),
//             }),
//         ),
//         i_field: Type.Array(
//             Type.Object({
//                 message: Type.String(),
//             }),
//         ),
//         o_field: Type.Array(
//             Type.Object({
//                 message: Type.String(),
//             }),
//         ),
//         s_field: Type.Array(
//             Type.Object({
//                 message: Type.String(),
//             }),
//         ),
//     }),
// );
interface IDENTIFICATION_ID {
    indentification_id: string;
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

    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: {
                indentification_id: { type: 'string' },
            },
            response: {
                200: GetRecordsRes,
            },
        },
        handler: async (request, reply) => {
            try {
                const { indentification_id } =
                    request.query as IDENTIFICATION_ID;
                const records = await fastify.prisma.record.findMany({
                    where: {
                        patient_id: indentification_id,
                    },
                });
                return records;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });

    fastify.route({
        method: 'GET',
        url: '/info',
        schema: {
            querystring: {
                indentification_id: { type: 'string' },
            },
            // response: {
            //     200: GetRecordsInformationResDTO,
            // },
        },
        handler: async (request, reply) => {
            try {
                const { indentification_id } =
                    request.query as IDENTIFICATION_ID;

                const records = await fastify.prisma.record.findMany({
                    where: {
                        patient_id: indentification_id,
                    },
                    include: {
                        a_field: true,
                        e_field: true,
                        i_field: true,
                        o_field: true,
                        s_field: true,
                    },
                });

                return records;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });

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
