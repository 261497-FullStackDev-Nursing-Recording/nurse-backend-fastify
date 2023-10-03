import { FastifyInstance } from 'fastify';

import { isDate } from '../../../utils/date';
import {
    type GetPatientsByIdsReq,
    type GetPatientsByIdsRes,
    type GetPatientsReq,
    type GetPatientsRes,
    type SearchPatientReq,
    type SearchPatientRes,
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
    try {
        const patients = await fastify.prisma.patient.findMany({
            where: {
                ...resOptions,
                isQuit: false,
                created_at: {
                    gte: fromDateObj,
                },
            },
        });
        return patients as unknown as GetPatientsRes;
    } catch (err) {
        throw err;
    }
}

export async function getPatientsByIds(
    fastify: FastifyInstance,
    body: GetPatientsByIdsReq,
) {
    try {
        const patients = await fastify.prisma.patient.findMany({
            where: {
                id: {
                    in: body,
                },
                isQuit: false,
            },
        });
        return patients as unknown as GetPatientsByIdsRes;
    } catch (err) {
        throw err;
    }
}

export async function searchForPatients(
    fastify: FastifyInstance,
    body: SearchPatientReq,
) {
    const { name, an, bed_number } = body;
    const nameSplit = name?.trim().split(' ') || [];
    const f_name = nameSplit[0];
    const l_name = nameSplit[1];
    try {
        const patients = await fastify.prisma.patient.findMany({
            where: {
                an: {
                    contains: an,
                    mode: 'insensitive',
                },
                current_bed_number: bed_number,
                f_name: {
                    contains: f_name,
                    mode: 'insensitive',
                },
                l_name: {
                    contains: l_name,
                    mode: 'insensitive',
                },
                isQuit: false,
            },
        });

        return patients as unknown as SearchPatientRes;
    } catch (err) {
        throw err;
    }
}

export async function updateLinkedPatient(
    fastify: FastifyInstance,
    user_id: string,
    body: UpdateLinkedReq,
) {
    try {
        await fastify.prisma.userOnPatient.deleteMany({
            where: {
                user_id: user_id,
                patient_id: {
                    in: body,
                },
            },
        });
    } catch (err) {
        throw err;
    }
}
