import { Role } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';

const UserBase = Type.Object({
    id: Type.String(),
    f_name: Type.String(),
    l_name: Type.String(),
    username: Type.String(),
    password: Type.String(),
    role: Type.Enum(Role),
    created_at: Type.String(),
});

const UserNoPassword = Type.Object({
    ...Type.Omit(UserBase, ['password']).properties,
});

export const UserRes = UserNoPassword;
export const UsersRes = Type.Array(UserNoPassword);
export type UserRes = Static<typeof UserRes>;
export type UsersRes = Static<typeof UsersRes>;

// Search
export const SearchUserReq = Type.Object({
    ...Type.Partial(Type.Omit(UserBase, ['password', 'created_at'])).properties,
});
export type SearchUserReq = Static<typeof SearchUserReq>;
