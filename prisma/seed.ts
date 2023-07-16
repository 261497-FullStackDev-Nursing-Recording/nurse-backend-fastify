import { PrismaClient } from '@prisma/client';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';

const prisma = new PrismaClient();

async function main() {
    const app = fastify();
    app.register(fastifyBcrypt);
    await app.ready();

    // const user = await prisma.user.create({
    //     data: {
    //         f_name: 'User1',
    //         l_name: 'User1',
    //         username: 'uniqe',
    //         password: await app.bcrypt.hash('password'),
    //         role: 'NURSE',
    //     },
    // });

    const _ = await prisma.record.createMany({
        data: [
            {
                user_id: 'a00178d4-ceed-4846-88c2-0139bb268723',
                patient_id: '37973c7f-44f2-435a-b4b3-525df1e9580b',
                bed_number: 1,
                ward: 'ward',
                diagnose: 'diagnose',
                shift: 'EVENING',
                visit_number: 'visit_number',
            },
            {
                user_id: 'a00178d4-ceed-4846-88c2-0139bb268723',
                patient_id: '37973c7f-44f2-435a-b4b3-525df1e9580b',
                bed_number: 2,
                ward: 'ward',
                diagnose: 'diagnose',
                shift: 'EVENING',
                visit_number: 'visit_number',
            },
        ],
    });

    // const patient = await prisma.patient.create({
    //     data: {
    //         f_name: 'f_nurse',
    //         l_name: 'l_nurse',
    //         hn: 'hn',
    //         status: 'STATUS_1',
    //     },
    // });
    console.log('records created:', _);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
