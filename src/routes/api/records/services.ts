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
    try {
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
            orderBy: {
                created_at: 'desc',
            },
        });
        return records as unknown as GetRecordsRes;
    } catch (err) {
        throw err;
    }
}

export async function createRecord(
    fastify: FastifyInstance,
    body: CreateRecordReq,
) {
    try {
        const record = await fastify.prisma.record.create({
            data: body,
        });
        return record as unknown as CreateRecordRes;
    } catch (err) {
        throw err;
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
    } catch (err) {
        throw err;
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
        throw err;
    }
}
