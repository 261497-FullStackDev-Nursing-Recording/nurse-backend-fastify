import { Status } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const Patient = Type.Object({
    id: Type.String(),
    indentification_id: Type.String(),
    f_name: Type.String(),
    l_name: Type.String(),
    hn: Type.String(),
    status: Type.Enum(Status),
    created_at: Type.String(),
});

//get all patient
export const GetPatientsReq = Type.Object({
    ...Type.Pick(Type.Partial(Patient), [
        'f_name',
        'l_name',
        'status',
        'indentification_id',
    ]).properties,
    fromDate: Type.Optional(Type.String()),
});
export type GetPatientsReq = Static<typeof GetPatientsReq>;
export type GetPatientsRes = Static<typeof Patient>[];

//search for patient
export const SearchPatientReq = Type.Object({
    name: Type.String(),
    identification_id: Type.String(),
});
export type SearchPatientReq = Static<typeof SearchPatientReq>;
export type SearchPatientRes = Static<typeof Patient>[];

//get  patients by ids
export const GetPatientsByIdsReq = Type.Object({
    ids: Type.Array(Type.String()),
});
export type GetPatientsByIdsReq = Static<typeof GetPatientsByIdsReq>;
export type GetPatientsByIdsRes = Static<typeof Patient>[];

//update linked patient
export const UpdateLinkedReq = Type.Object({
    ids: Type.Array(Type.String()),
});
export type UpdateLinkedReq = Static<typeof UpdateLinkedReq>;
