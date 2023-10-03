import { FieldCode } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const Field = Type.Object({
    id: Type.String(),
    record_id: Type.String(),
    field_type: Type.Enum(FieldCode),
    field_pre_label: Type.String(),
    field_data: Type.String(),
    field_date: Type.String(),
    created_at: Type.Date(),
    modified_at: Type.Date(),
});

// Update Field API
export const UpdateFieldReq = Type.Object({
    ...Type.Pick(Type.Partial(Field), [
        'field_type',
        'field_pre_label',
        'field_data',
        'field_date',
    ]).properties,
});

// Create Field API
export const CreateFieldsReq = Type.Array(
    Type.Object({
        ...Type.Pick(Type.Required(Field), [
            'record_id',
            'field_type',
            'field_data',
        ]).properties,
        ...Type.Pick(Type.Partial(Field), ['field_pre_label', 'field_date'])
            .properties,
    }),
);

export type UpdateFieldReq = Static<typeof UpdateFieldReq>;
export type UpdateFieldRes = null;
export type CreateFieldsReq = Static<typeof CreateFieldsReq>;
export type CreateFieldsRes = null;
