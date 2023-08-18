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

//search for patient
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
export type GetPatientsRes = Static<typeof Patient>[]; //for type script definition
