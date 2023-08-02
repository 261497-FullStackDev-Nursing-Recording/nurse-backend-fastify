// import { FastifyInstance } from 'fastify';

// import { CreateFieldsReq, UpdateFieldReq } from './types';

// export async function createAFields(
//     fastify: FastifyInstance,
//     body: CreateFieldsReq,
// ) {
//     try {
//         const fields = await fastify.prisma.a_Field.createMany({
//             data: body,
//         });
//         return fields;
//     } catch (err) {
//         return err;
//     }
// }
// export async function createEFields(
//     fastify: FastifyInstance,
//     body: CreateFieldsReq,
// ) {
//     try {
//         const fields = await fastify.prisma.e_Field.createMany({
//             data: body,
//         });
//         return fields;
//     } catch (err) {
//         return err;
//     }
// }
// export async function createIFields(
//     fastify: FastifyInstance,
//     body: CreateFieldsReq,
// ) {
//     try {
//         const fields = await fastify.prisma.i_Field.createMany({
//             data: body,
//         });
//         return fields;
//     } catch (err) {
//         return err;
//     }
// }
// export async function createOFields(
//     fastify: FastifyInstance,
//     body: CreateFieldsReq,
// ) {
//     try {
//         const fields = await fastify.prisma.o_Field.createMany({
//             data: body,
//         });
//         return fields;
//     } catch (err) {
//         return err;
//     }
// }
// export async function createSFields(
//     fastify: FastifyInstance,
//     body: CreateFieldsReq,
// ) {
//     try {
//         const fields = await fastify.prisma.s_Field.createMany({
//             data: body,
//         });
//         return fields;
//     } catch (err) {
//         return err;
//     }
// }
// export async function updateAField(
//     fastify: FastifyInstance,
//     body: UpdateFieldReq,
//     id: string,
// ) {
//     try {
//         const field = await fastify.prisma.a_Field.update({
//             where: {
//                 id: id,
//             },
//             data: body,
//         });
//         return field;
//     } catch (err) {
//         return err;
//     }
// }
// export async function updateEField(
//     fastify: FastifyInstance,
//     body: UpdateFieldReq,
//     id: string,
// ) {
//     try {
//         const field = await fastify.prisma.e_Field.update({
//             where: {
//                 id: id,
//             },
//             data: body,
//         });
//         return field;
//     } catch (err) {
//         return err;
//     }
// }
// export async function updateIField(
//     fastify: FastifyInstance,
//     body: UpdateFieldReq,
//     id: string,
// ) {
//     try {
//         const field = await fastify.prisma.i_Field.update({
//             where: {
//                 id: id,
//             },
//             data: body,
//         });
//         return field;
//     } catch (err) {
//         return err;
//     }
// }
// export async function updateOField(
//     fastify: FastifyInstance,
//     body: UpdateFieldReq,
//     id: string,
// ) {
//     try {
//         const field = await fastify.prisma.o_Field.update({
//             where: {
//                 id: id,
//             },
//             data: body,
//         });
//         return field;
//     } catch (err) {
//         return err;
//     }
// }
// export async function updateSField(
//     fastify: FastifyInstance,
//     body: UpdateFieldReq,
//     id: string,
// ) {
//     try {
//         const field = await fastify.prisma.s_Field.update({
//             where: {
//                 id: id,
//             },
//             data: body,
//         });
//         return field;
//     } catch (err) {
//         return err;
//     }
// }
