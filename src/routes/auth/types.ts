import { Static, Type } from '@sinclair/typebox';

export const SignInReq = Type.Object({
    username: Type.String(),
    password: Type.String(),
});
export type SignInReq = Static<typeof SignInReq>;
