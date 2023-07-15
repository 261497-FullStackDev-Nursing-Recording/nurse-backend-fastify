import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

const GetRecordsResDTO = Type.Array(
    Type.Object({
        id: Type.String(),
        user_id: Type.String(),
        patient_id: Type.String(),
        bed_number: Type.Integer(),
        ward: Type.String(),
        diagnose: Type.String(),
        shift: Type.String(),
        visit_number: Type.String(),
        created_at: Type.String(),
        modified_at: Type.String(),
    }),
);

const records: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
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
            response: {
                200: GetRecordsResDTO,
            },
        },
        handler: async (request, reply) => {
            try {
                const records = await fastify.prisma.record.findMany();
                return records;
            } catch (err) {
                reply.code(500).send(err);
            }
        },
    });
};

export default records;
