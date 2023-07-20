import { PrismaClient } from '@prisma/client';
import { Patient, Role, Shift, Status, User } from '@prisma/client';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';

const prisma = new PrismaClient();

async function main() {
    const app = fastify();
    app.register(fastifyBcrypt);
    await app.ready();

    await prisma.userOnPatient.deleteMany({});
    await prisma.record.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.patient.deleteMany({});

    //  Create patient
    await prisma.patient.createMany({
        data: [
            {
                f_name: 'Patient1',
                l_name: 'Bed1',
                hn: '001',
                status: Status.STATUS_1,
            },
            {
                f_name: 'Patient2',
                l_name: 'Bed2',
                hn: '002',
                status: Status.STATUS_2,
            },
            {
                f_name: 'Patient3',
                l_name: 'Bed3',
                hn: '003',
                status: Status.STATUS_3,
            },
            {
                f_name: 'Patient4',
                l_name: 'Bed3',
                hn: '003',
                status: Status.STATUS_4,
            },
        ],
    });

    //  Create users
    await prisma.user.createMany({
        data: [
            {
                f_name: 'First1',
                l_name: 'Last1',
                username: 'username1',
                password: await app.bcrypt.hash('1234'),
                role: Role.ADMIN,
            },
            {
                f_name: 'First2',
                l_name: 'Last2',
                username: 'username2',
                password: await app.bcrypt.hash('1234'),
                role: Role.NURSE,
            },
            {
                f_name: 'First3',
                l_name: 'Last3',
                username: 'username3',
                password: await app.bcrypt.hash('1234'),
                role: Role.NURSE,
            },
            {
                f_name: 'First4',
                l_name: 'Last4',
                username: 'username4',
                password: await app.bcrypt.hash('1234'),
                role: Role.NURSE,
            },
            {
                f_name: 'First5',
                l_name: 'Last5',
                username: 'username5',
                password: await app.bcrypt.hash('1234'),
                role: Role.NURSE,
            },
        ],
    });

    // Create random links between users and patients
    const nurses = await prisma.user.findMany({ where: { role: Role.NURSE } });
    const patients = await prisma.patient.findMany();
    const usersOnPatients = [...Array(10).keys()].map((idx) => ({
        user_id: getRandomElement<User>(nurses).id,
        patient_id: getRandomElement<Patient>(patients).id,
    }));
    for (const uop of usersOnPatients) {
        try {
            await prisma.userOnPatient.create({
                data: uop,
            });
        } catch (e) {
            // If there is a duplicate of user_id and patient_id, just ignore it
        }
    }

    // Create records
    const records = [...Array(10).keys()].map((idx) => ({
        user_id: getRandomElement<User>(nurses).id,
        patient_id: getRandomElement<Patient>(patients).id,
        bed_number: idx,
        ward: 'ward',
        diagnose: 'diagnose',
        shift: Shift.EVENING,
        visit_number: 'visit_number',
        a_field: {
            create: [{ message: 'a_field1' }, { message: 'a_field2' }],
        },
        e_field: {
            create: [{ message: 'e_field1' }, { message: 'e_field2' }],
        },
        i_field: {
            create: [{ message: 'i_field1' }, { message: 'i_field2' }],
        },
        o_field: {
            create: [{ message: 'o_field1' }, { message: 'o_field2' }],
        },
        s_field: {
            create: [{ message: 's_field1' }, { message: 's_field2' }],
        },
    }));

    await prisma.record.createMany({
        data: records,
    });

    // const a_field = await prisma.a_Field.createMany({
    //     data: [
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'a_field1',
    //         },
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'a_field2',
    //         },
    //     ],
    // });
    // const e_field = await prisma.e_Field.createMany({
    //     data: [
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'e_field1',
    //         },
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'e_field2',
    //         },
    //     ],
    // });
    // const i_field = await prisma.i_Field.createMany({
    //     data: [
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'i_field1',
    //         },
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'i_field2',
    //         },
    //     ],
    // });
    // const o_field = await prisma.o_Field.createMany({
    //     data: [
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'o_field1',
    //         },
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 'o_field2',
    //         },
    //     ],
    // });
    // const s_field = await prisma.s_Field.createMany({
    //     data: [
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 's_field1',
    //         },
    //         {
    //             record_id: '495cb271-84fa-4f04-bcbc-1c746d3542b6',
    //             message: 's_field2',
    //         },
    //     ],
    // });

    // const records = await prisma.record.createMany({
    //     data: [
    //         {
    //             user_id: 'a00178d4-ceed-4846-88c2-0139bb268723',
    //             patient_id: '37973c7f-44f2-435a-b4b3-525df1e9580b',
    //             bed_number: 1,
    //             ward: 'ward',
    //             diagnose: 'diagnose',
    //             shift: 'EVENING',
    //             visit_number: 'visit_number',
    //         },
    //         {
    //             user_id: 'a00178d4-ceed-4846-88c2-0139bb268723',
    //             patient_id: '37973c7f-44f2-435a-b4b3-525df1e9580b',
    //             bed_number: 2,
    //             ward: 'ward',
    //             diagnose: 'diagnose',
    //             shift: 'EVENING',
    //             visit_number: 'visit_number',
    //         },
    //     ],
    // });
    // console.log('create' + patients);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

function getRandomElement<T>(array: T[]) {
    return array[Math.floor(Math.random() * array.length)];
}
