import { Static, Type } from '@sinclair/typebox';

const Field = Type.Object({
    id: Type.String(),
    message: Type.String(),
});
export const UpdateFieldRes = null;
export type UpdateFieldRes = null;

export const CreateFieldsRes = null;
export type CreateFieldsRes = null;

// Update Field API
export const UpdateFieldReq = Type.Object({
    ...Type.Pick(Type.Partial(Field), ['message']).properties,
});
export type UpdateFieldReq = Static<typeof UpdateFieldReq>;

//Create Field API
export const CreateFieldsReq = Type.Array(
    Type.Object({
        message: Type.String(),
        record_id: Type.Optional(Type.String()),
    }),
);
export type CreateFieldsReq = Static<typeof CreateFieldsReq>;
