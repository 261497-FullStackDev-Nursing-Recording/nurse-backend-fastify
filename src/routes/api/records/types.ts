import { Shift } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const Record = Type.Object({
    id: Type.String(),
    user_id: Type.String(),
    patient_id: Type.String(),
    bed_number: Type.Integer(),
    ward: Type.String(),
    disease_group: Type.String(),
    shift: Type.Enum(Shift),
    visit_number: Type.String(),
    created_at: Type.Date(),
    modified_at: Type.Date(),
});

export const GetRecordsReq = Type.Object({
    ...Type.Pick(Type.Partial(Record), [
        'user_id',
        'patient_id',
        'bed_number',
        'ward',
        'disease_group',
        'shift',
        'visit_number',
    ]).properties,
    fromDate: Type.Optional(Type.String()),
    includeFields: Type.Optional(Type.Boolean()),
});

export const CreateRecordReq = Type.Object({
    ...Type.Pick(Type.Required(Record), ['user_id', 'patient_id']).properties,
    ...Type.Pick(Type.Partial(Record), [
        'bed_number',
        'ward',
        'disease_group',
        'shift',
        'visit_number',
    ]).properties,
});

export const UpdateRecordReq = Type.Object({
    ...Type.Pick(Type.Partial(Record), [
        'bed_number',
        'ward',
        'disease_group',
        'shift',
        'visit_number',
    ]).properties,
});

export type GetRecordsReq = Static<typeof GetRecordsReq>;
export type GetRecordsRes = Static<typeof Record>[];
export type CreateRecordReq = Static<typeof CreateRecordReq>;
export type CreateRecordRes = Static<typeof Record>;
export type UpdateRecordReq = Static<typeof UpdateRecordReq>;
