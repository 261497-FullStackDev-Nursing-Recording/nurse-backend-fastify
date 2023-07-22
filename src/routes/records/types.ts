import { Shift } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const Field = Type.Object({
    id: Type.String(),
    message: Type.String(),
});

const Record = Type.Object({
    id: Type.String(),
    user_id: Type.String(),
    patient_id: Type.String(),
    bed_number: Type.Integer(),
    ward: Type.String(),
    diagnose: Type.String(),
    shift: Type.Enum(Shift),
    visit_number: Type.String(),
    created_at: Type.String(),
    modified_at: Type.String(),
    a_field: Type.Array(Field),
    e_field: Type.Array(Field),
    i_field: Type.Array(Field),
    o_field: Type.Array(Field),
    s_field: Type.Array(Field),
});

// Default Response
export const GetRecordsRes = Type.Array(Type.Partial(Record)); // For API schema
export type GetRecordsRes = Static<typeof GetRecordsRes>; // For typescript definition

// Search API
export const SearchRecordReq = Type.Object({
    ...Type.Pick(Type.Partial(Record), [
        'id',
        'patient_id',
        'bed_number',
        'ward',
        'diagnose',
        'shift',
        'visit_number',
    ]).properties,
    fromDate: Type.Optional(Type.String()),
    toDate: Type.Optional(Type.String()),
    includeFields: Type.Optional(Type.Boolean()),
});
export type SearchRecordReq = Static<typeof SearchRecordReq>;
