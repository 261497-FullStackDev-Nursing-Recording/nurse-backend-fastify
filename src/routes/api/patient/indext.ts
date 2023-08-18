import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { handleError } from '../../../utils/error';
import { getPatients } from './services';
import { GetPatientsReq } from './types';

const patients: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();
    // fastify.addHook('onRequest', async (req, res) => {
    //     try {
    //         await req.jwtVerify();
    //     } catch (err) {
    //         res.send(err);
    //     }
    // });

    server.route({
        method: 'POST',
        url: '/search',
        schema: {
            tags: ['patients'],
            description: 'Get patients',
            body: GetPatientsReq,
        },
        handler: async (request, reply) => {
            try {
                const patients = getPatients(server, request.body);
                return patients;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });

    server.route({
        method: 'POST',
        url: '/linkPatients',
        schema: {
            tags: ['patients'],
            description: 'Link a patient',
            body: {
                type: 'object',
                properties: {
                    user_id: { type: 'string' },
                    patient_id: { type: 'string' },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const body: any = request.body;
                const linkPatients = fastify.prisma.userOnPatient.create({
                    data: {
                        user_id: body.user_id,
                        patient_id: body.patient_id,
                    },
                });
                return linkPatients;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });

    server.route({
        method: 'POST',
        url: '/GetLinkedPatients',
        schema: {
            tags: ['patients'],
            description: 'Get linked patient',
            body: {
                type: 'object',
                properties: {
                    user_id: { type: 'string' },
                },
            },
        },
        handler: async (request, reply) => {
            try {
                const body: any = request.body;
                const patients = fastify.prisma.userOnPatient.findMany({
                    where: {
                        user_id: body.user_id,
                    },
                });
                return patients;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
};

export default patients;
