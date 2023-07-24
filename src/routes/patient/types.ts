import { Status } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const Patient = Type.Object({
    id: Type.String(),
    indentification_id: Type.String(),
    f_name: Type.String(),
    l_name: Type.String(),
    hn: Type.String(),
    status: Type.Enum(Status),
});

export const GetPatientsRes = Type.Array(Type.Partial(Patient)); //for api schema
export type GetPatients = Static<typeof GetPatientsRes>; //for type script definition

//search for patient
export const SearchPatientsReq = Type.Object({
    ...Type.Pick(Type.Partial(Patient), [
        'f_name',
        'l_name',
        'status',
        'indentification_id',
    ]).properties,
    fromDate: Type.Optional(Type.String()),
    toDate: Type.Optional(Type.String()),
});
export type SearchPatientsReq = Static<typeof SearchPatientsReq>;
