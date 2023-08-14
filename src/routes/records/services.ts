import { FastifyInstance } from 'fastify';
import { isDate } from 'util/types';

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
        const { fields, ...rec } = body;

        const record = await fastify.prisma.record.create({
            data: {
                ...rec,
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
