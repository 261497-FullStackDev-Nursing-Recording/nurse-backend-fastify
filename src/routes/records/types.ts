import { Shift } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

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
});

// Default Response
export const GetRecordsRes = Type.Array(Type.Partial(Record)); // For API schema
export type GetRecordsRes = Static<typeof GetRecordsRes>; // For typescript definition

// Search API
export const SearchRecordReq = Type.Object({
    ...Type.Pick(Type.Partial(Record), [
        'bed_number',
        'ward',
        'diagnose',
        'shift',
        'visit_number',
    ]).properties,
    fromDate: Type.Optional(Type.String()),
    toDate: Type.Optional(Type.String()),
});
export type SearchRecordReq = Static<typeof SearchRecordReq>;
