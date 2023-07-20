import { PrismaClient } from '@prisma/client';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';

const prisma = new PrismaClient();

async function main() {
    const app = fastify();
    app.register(fastifyBcrypt);
    await app.ready();

    /**
     * create a patients in the database if you don't need it just comment it
     */
    const patients = await prisma.patient.createMany({
        data: [
            {
                f_name: 'Patients',
                l_name: 'Bed1',
                hn: '001',
                status: 'STATUS_1',
            },
            {
                f_name: 'Patients',
                l_name: 'Bed2',
                hn: '002',
                status: 'STATUS_2',
            },
            {
                f_name: 'Patients',
                l_name: 'Bed3',
                hn: '003',
                status: 'STATUS_3',
            },
        ],
    });

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
    console.log('create' + patients);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
