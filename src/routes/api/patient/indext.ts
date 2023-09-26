import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { handleError } from '../../../utils/error';
import {
    getPatients,
    getPatientsByIds,
    searchForPatients,
    updateLinkedPatient,
} from './services';
import {
    GetPatientsByIdsReq,
    GetPatientsReq,
    SearchPatientReq,
    UpdateLinkedReq,
} from './types';

interface IParamPatient {
    user_id: string;
}

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
            description: 'Search For patients',
            body: SearchPatientReq,
        },
        handler: async (request, reply) => {
            try {
                const patients = searchForPatients(server, request.body);
                return patients;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
    server.route({
        method: 'POST',
        url: '/getAllPatient',
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
        url: '/getPatientsByIds',
        schema: {
            tags: ['patients'],
            description: 'Get patients by patientIds',
            body: GetPatientsByIdsReq,
        },
        handler: async (request, reply) => {
            try {
                const patients = getPatientsByIds(server, request.body);
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
        method: 'GET',
        url: '/getLinkedPatients/:user_id',
        schema: {
            tags: ['patients'],
            description: 'Get linked patient',
            params: {
                type: 'object',
                properties: {
                    user_id: { type: 'string' },
                },
            },
        },
        handler: async (request, reply) => {
            const { user_id } = request.params as IParamPatient;
            try {
                const patients = fastify.prisma.userOnPatient.findMany({
                    where: {
                        user_id: user_id,
                    },
                });
                return patients;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
    server.route({
        method: 'PUT',
        url: '/updateLikedPatient',
        schema: {
            tags: ['patients'],
            description: 'Update linked patient',
            params: {
                type: 'object',
                properties: {
                    user_id: { type: 'string' },
                },
            },
            body: UpdateLinkedReq,
        },
        handler: async (request, reply) => {
            try {
                const { user_id } = request.params as IParamPatient;
                const body: any = request.body;
                await updateLinkedPatient(server, user_id, body);
                return null;
            } catch (err: any) {
                return handleError(reply, 500, err);
            }
        },
    });
};

export default patients;
