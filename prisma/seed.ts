import { PrismaClient } from '@prisma/client';
import { Patient, Role, Shift, Status, User } from '@prisma/client';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';

const prisma = new PrismaClient();

async function main() {
    const app = fastify();
    app.register(fastifyBcrypt);
    await app.ready();

    await prisma.a_Field.deleteMany({});
    await prisma.e_Field.deleteMany({});
    await prisma.i_Field.deleteMany({});
    await prisma.o_Field.deleteMany({});
    await prisma.s_Field.deleteMany({});
    await prisma.userOnPatient.deleteMany({});
    await prisma.record.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.patient.deleteMany({});

    //  Create patient
    await prisma.patient.createMany({
        data: [
            {
                identification_id: '1',
                f_name: 'Patient1',
                l_name: 'Bed1',
                hn: '001',
                status: Status.STATUS_1,
            },
            {
                identification_id: '2',
                f_name: 'Patient2',
                l_name: 'Bed2',
                hn: '002',
                status: Status.STATUS_2,
            },
            {
                identification_id: '3',
                f_name: 'Patient3',
                l_name: 'Bed3',
                hn: '003',
                status: Status.STATUS_3,
            },
            {
                identification_id: '4',
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
    const recordsData = [...Array(10).keys()].map((idx) => ({
        user_id: getRandomElement<User>(nurses).id,
        patient_id: getRandomElement<Patient>(patients).id,
        bed_number: idx,
        ward: 'ward',
        diagnose: 'diagnose',
        shift: Shift.EVENING,
        visit_number: 'visit_number',
    }));

    await prisma.record.createMany({
        data: recordsData,
    });

    // Create nurse notes
    const records = await prisma.record.findMany({});
    records.forEach(async (record) => {
        await prisma.a_Field.createMany({
            data: [
                { record_id: record.id, message: 'a_field1' },
                { record_id: record.id, message: 'a_field2' },
            ],
        });

        await prisma.e_Field.createMany({
            data: [
                { record_id: record.id, message: 'e_field1' },
                { record_id: record.id, message: 'e_field2' },
            ],
        });

        await prisma.i_Field.createMany({
            data: [
                { record_id: record.id, message: 'i_field1' },
                { record_id: record.id, message: 'i_field2' },
            ],
        });

        await prisma.o_Field.createMany({
            data: [
                { record_id: record.id, message: 'o_field1' },
                { record_id: record.id, message: 'o_field2' },
            ],
        });

        await prisma.s_Field.createMany({
            data: [
                { record_id: record.id, message: 's_field1' },
                { record_id: record.id, message: 's_field2' },
            ],
        });
    });
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
