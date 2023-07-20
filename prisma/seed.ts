import { PrismaClient } from '@prisma/client';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';

const prisma = new PrismaClient();

async function main() {
    const app = fastify();
    app.register(fastifyBcrypt);
    await app.ready();

    const user = await prisma.user.create({
        data: {
            f_name: 'User1',
            l_name: 'User1',
            username: 'user',
            password: await app.bcrypt.hash('password'),
            role: 'NURSE',
        },
    });

    const patient = await prisma.patient.create({
        data: {
            f_name: 'f_nurse',
            l_name: 'l_nurse',
            hn: 'hn',
            status: 'STATUS_1',
        },
    });
    const records = await prisma.record.createMany({
        data: [
            {
                user_id: user.id,
                patient_id: patient.id,
                bed_number: 1,
                ward: 'ward',
                diagnose: 'diagnose',
                shift: 'EVENING',
                visit_number: 'visit_number',
            },
            {
                user_id: user.id,
                patient_id: patient.id,
                bed_number: 2,
                ward: 'ward',
                diagnose: 'diagnose',
                shift: 'EVENING',
                visit_number: 'visit_number',
            },
        ],
    });
    const a_field = await prisma.a_Field.createMany({
        data: [
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'a_field1',
            },
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'a_field2',
            },
        ],
    });
    const e_field = await prisma.e_Field.createMany({
        data: [
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'e_field1',
            },
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'e_field2',
            },
        ],
    });
    const i_field = await prisma.i_Field.createMany({
        data: [
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'i_field1',
            },
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'i_field2',
            },
        ],
    });
    const o_field = await prisma.o_Field.createMany({
        data: [
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'o_field1',
            },
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 'o_field2',
            },
        ],
    });
    const s_field = await prisma.s_Field.createMany({
        data: [
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 's_field1',
            },
            {
                record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
                message: 's_field2',
            },
        ],
    });
    console.log(user);
    console.log(patient);
    console.log(records);
    console.log(a_field);
    console.log(e_field);
    console.log(i_field);
    console.log(o_field);
    console.log(s_field);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
