import { FastifyInstance } from 'fastify';

import { type GetRecordsRes, type SearchRecordReq } from './types';

// export async function getRecords(fastify: FastifyInstance) {
//     const records = await fastify.prisma.record.findMany();
//     return records as unknown as GetRecordsRes; // I will see if there is a better way to do this. Right now if I don't do this typescript will keep complaining.
// }

// Search API that can handle different parameters
export async function searchRecords(
    fastify: FastifyInstance,
    body: SearchRecordReq,
) {
    const { fromDate, includeFields, ...restOptions } = body;
    // Handle data input
    if (!isDate(fromDate || '1970-01-01')) throw new Error('Invalid fromDate');
    const fromDateObj = new Date(fromDate || '1970-01-01');
    const records = await fastify.prisma.record.findMany({
        where: {
            ...restOptions,
            created_at: {
                gte: fromDateObj,
            },
        },
        include: includeFields
            ? {
                  a_field: true,
                  e_field: true,
                  i_field: true,
                  o_field: true,
                  s_field: true,
              }
            : undefined,
    });
    return records as unknown as GetRecordsRes; // I will see if there is a better way to do this. Right now if I don't do this typescript will keep complaining.
}

function isDate(dateStr: string | undefined) {
    if (!dateStr) return false;
    return !isNaN(new Date(dateStr).getDate());
}
