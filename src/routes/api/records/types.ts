import { Shift } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

import { CreateFieldsReq } from '../fields/types';

const Record = Type.Object({
    id: Type.String(),
    user_id: Type.String(),
    patient_id: Type.String(),
    bed_number: Type.Integer(),
    ward: Type.String(),
    diseaseGroup: Type.String(),
    shift: Type.Enum(Shift),
    visit_number: Type.String(),
    fields: CreateFieldsReq,
    created_at: Type.String(),
    modified_at: Type.String(),
});

export const GetRecordsReq = Type.Object({
    ...Type.Pick(Type.Partial(Record), [
        'user_id',
        'patient_id',
        'bed_number',
        'ward',
        'diseaseGroup',
        'shift',
        'visit_number',
    ]).properties,
    fromDate: Type.Optional(Type.String()),
    includeFields: Type.Optional(Type.Boolean()),
});
export type GetRecordsReq = Static<typeof GetRecordsReq>;
export type GetRecordsRes = Static<typeof Record>[];

export const CreateRecordReq = Type.Object({
    ...Type.Pick(Type.Required(Record), [
        'user_id',
        'patient_id',
        'bed_number',
        'ward',
        'diseaseGroup',
        'shift',
        'visit_number',
        'fields',
    ]).properties,
});
export type CreateRecordReq = Static<typeof CreateRecordReq>;
export type CreateRecordRes = Static<typeof Record>;

export const UpdateRecordReq = Type.Object({
    ...Type.Pick(Type.Partial(Record), [
        'bed_number',
        'ward',
        'diseaseGroup',
        'shift',
        'visit_number',
    ]).properties,
});
export type UpdateRecordReq = Static<typeof UpdateRecordReq>;
