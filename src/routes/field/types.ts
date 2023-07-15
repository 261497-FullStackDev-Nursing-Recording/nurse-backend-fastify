import { Static, Type } from '@sinclair/typebox';

const Field = Type.Object({
    message: Type.String(),
});
// Default Response
export const UpdateFieldRes = null; // For API schema
export type UpdateFieldRes = null; // For typescript definition

// Update Field API
export const UpdateFieldReq = Field;
export type UpdateFieldReq = Static<typeof UpdateFieldReq>;
