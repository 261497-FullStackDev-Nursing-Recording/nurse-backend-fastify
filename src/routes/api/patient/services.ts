import { FastifyInstance } from 'fastify';

import { isDate } from '../../../utils/date';
import {
    type GetPatientsReq,
    type GetPatientsRes,
    type UpdateLinkedReq,
} from './types';

export async function getPatients(
    fastify: FastifyInstance,
    body: GetPatientsReq,
) {
    const { fromDate, ...resOptions } = body;
    if (!isDate(fromDate)) {
        throw new Error('Invalid fromDate');
    }
    const fromDateObj = new Date(fromDate || '1970-01-01');
    const patients = await fastify.prisma.patient.findMany({
        where: {
            ...resOptions,
            created_at: {
                gte: fromDateObj,
            },
        },
    });

    return patients as unknown as GetPatientsRes;
}

export async function updateLinkedPatient(
    fastify: FastifyInstance,
    user_id: string,
    body: UpdateLinkedReq,
) {
    const { id: patientIds } = body;

    await fastify.prisma.userOnPatient.deleteMany({
        where: {
            user_id: user_id,
            patient_id: {
                in: patientIds,
            },
        },
    });
}
