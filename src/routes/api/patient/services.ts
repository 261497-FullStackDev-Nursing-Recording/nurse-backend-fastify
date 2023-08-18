import { FastifyInstance } from 'fastify';

import { isDate } from '../../../utils/date';
import { type GetPatientsReq, type GetPatientsRes } from './types';

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
