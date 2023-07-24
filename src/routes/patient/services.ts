import { FastifyInstance } from 'fastify';

import { type GetPatients, type SearchPatientsReq } from './types';

export async function searchPatient(
    fastify: FastifyInstance,
    body: SearchPatientsReq,
) {
    const { ...resOptions } = body;

    const patients = await fastify.prisma.patient.findMany({
        where: {
            ...resOptions,
        },
    });

    return patients as unknown as GetPatients;
}
