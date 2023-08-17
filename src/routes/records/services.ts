import { FastifyInstance } from 'fastify';

import { isDate } from '../../utils/date';
import {
    type CreateRecordReq,
    type CreateRecordRes,
    type GetRecordsReq,
    type GetRecordsRes,
    type UpdateRecordReq,
    type UpdateRecordRes,
} from './types';

export async function getRecords(
    fastify: FastifyInstance,
    body: GetRecordsReq,
) {
    const { fromDate, toDate, includeFields, ...restOptions } = body;
    // Handle data input
    if (!isDate(fromDate) || !isDate(toDate)) {
        throw new Error('Invalid fromDate');
    }
    const fromDateObj = new Date(fromDate || '1970-01-01');
    const toDateObj = new Date(toDate || '');
    console.log(fromDateObj);
    console.log(toDateObj);
    const records = await fastify.prisma.record.findMany({
        where: {
            ...restOptions,
            created_at: {
                gte: fromDateObj,
                lte: toDateObj,
            },
        },
        include: includeFields
            ? {
                  fields: true,
              }
            : undefined,
    });
    return records as unknown as GetRecordsRes;
}

export async function createRecord(
    fastify: FastifyInstance,
    body: CreateRecordReq,
) {
    try {
        const { fields, ...data } = body;
        const record = await fastify.prisma.record.create({
            data: {
                ...data,
                fields: { create: fields },
            },
        });
        return record as unknown as CreateRecordRes;
    } catch (err) {
        throw new Error('Failed to create record');
    }
}

export async function updateRecord(
    fastify: FastifyInstance,
    body: UpdateRecordReq,
    id: string,
) {
    try {
        const record = await fastify.prisma.record.update({
            where: {
                id: id,
            },
            data: body,
        });
        return record as unknown as UpdateRecordRes;
    } catch (err) {
        throw new Error('Failed to update record');
    }
}
