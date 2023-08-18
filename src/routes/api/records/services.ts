import { FastifyInstance } from 'fastify';

import { isDate } from '../../../utils/date';
import {
    type CreateRecordReq,
    type CreateRecordRes,
    type GetRecordsReq,
    type GetRecordsRes,
    type UpdateRecordReq,
} from './types';

export async function getRecords(
    fastify: FastifyInstance,
    body: GetRecordsReq,
) {
    const { fromDate, includeFields, ...restOptions } = body;

    if (!isDate(fromDate)) {
        throw new Error('Invalid fromDate');
    }
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
        await fastify.prisma.record.update({
            where: {
                id: id,
            },
            data: body,
        });
    } catch (error) {
        throw new Error(`Failed to update record`);
    }
}

export async function deleteRecord(fastify: FastifyInstance, id: string) {
    try {
        await fastify.prisma.field.deleteMany({
            where: {
                record_id: id,
            },
        });
        await fastify.prisma.record.delete({
            where: {
                id: id,
            },
        });
        return null;
    } catch (err) {
        throw new Error('Failed to delete record');
    }
}
