import { FieldCode } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

export const Field = Type.Object({
    record_id: Type.String(),
    user_id: Type.String(),
    field_code: Type.Enum(FieldCode),
    field_pre_label: Type.Optional(Type.String()),
    field_value: Type.String(),
    field_post_label: Type.Optional(Type.String()),
});

// Update Field API
export const UpdateFieldReq = Type.Object({
    ...Type.Pick(Type.Partial(Field), [
        'field_code',
        'field_pre_label',
        'field_value',
        'field_post_label',
    ]).properties,
});
export type UpdateFieldReq = Static<typeof UpdateFieldReq>;
export type UpdateFieldRes = null;

//Create Field API
export const CreateFieldsReq = Type.Array(Field);
export type CreateFieldsReq = Static<typeof CreateFieldsReq>;
export type CreateFieldsRes = null;
