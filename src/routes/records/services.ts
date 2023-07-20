import { FastifyInstance } from 'fastify';

import { type GetRecordsRes, type SearchRecordReq } from './types';

export async function getRecords(fastify: FastifyInstance) {
    const records = await fastify.prisma.record.findMany();
    return records as unknown as GetRecordsRes; // I will see if there is a better way to do this. Right now if I don't do this typescript will keep complaining.
}

export async function searchRecords(
    fastify: FastifyInstance,
    body: SearchRecordReq,
) {
    const { fromDate, ...rest } = body;
    if (!isDate(fromDate)) throw new Error('Invalid fromDate');
    const records = await fastify.prisma.record.findMany({
        where: {
            ...rest,
            created_at: {
                gte: new Date(fromDate || ''),
            },
        },
    });
    return records as unknown as GetRecordsRes;
}

function isDate(dateStr: string | undefined) {
    if (!dateStr) return false;
    return !isNaN(new Date(dateStr).getDate());
}
