import { Status } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const Patient = Type.Object({
    id: Type.String(),
    f_name: Type.String(),
    l_name: Type.String(),
    age: Type.Integer(),
    birthday: Type.String(),
    phone_number: Type.String(),
    identification_id: Type.String(),
    an: Type.String(),
    hn: Type.String(),
    current_bed_number: Type.Integer(),
    isQuit: Type.Boolean(),
    status: Type.Enum(Status),
    created_at: Type.Date(),
});

//get all patient
export const GetPatientsReq = Type.Object({
    ...Type.Pick(Type.Partial(Patient), [
        'f_name',
        'l_name',
        'age',
        'birthday',
        'phone_number',
        'identification_id',
        'an',
        'hn',
        'current_bed_number',
        'isQuit',
        'status',
    ]).properties,
    fromDate: Type.Optional(Type.String()),
});

//search for patient
export const SearchPatientReq = Type.Object({
    an: Type.Optional(Type.String()),
    bed_number: Type.Optional(Type.Integer()),
    name: Type.Optional(Type.String()),
});

//get  patients by ids
export const GetPatientsByIdsReq = Type.Object({
    ids: Type.Array(Type.String()),
});

//update linked patient
export const UpdateLinkedReq = Type.Object({
    ids: Type.Array(Type.String()),
});

export type GetPatientsReq = Static<typeof GetPatientsReq>;
export type GetPatientsRes = Static<typeof Patient>[];
export type SearchPatientReq = Static<typeof SearchPatientReq>;
export type SearchPatientRes = Static<typeof Patient>[];
export type GetPatientsByIdsReq = Static<typeof GetPatientsByIdsReq>;
export type GetPatientsByIdsRes = Static<typeof Patient>[];
export type UpdateLinkedReq = Static<typeof UpdateLinkedReq>;
