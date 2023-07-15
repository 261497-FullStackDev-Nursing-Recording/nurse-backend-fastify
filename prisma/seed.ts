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
    const records = await prisma.record.createMany({
        data: [
            {
                user_id: '44cb4235-a670-4260-a6f3-f57c7b453e6d',
                bed_number: 1,
                ward: 'ward',
                diagnose: 'diagnose',
                shift: 'EVENING',
                visit_number: 'visit_number',
            },
            {
                user_id: '44cb4235-a670-4260-a6f3-f57c7b453e6d',
                bed_number: 2,
                ward: 'ward',
                diagnose: 'diagnose',
                shift: 'EVENING',
                visit_number: 'visit_number',
            },
        ],
    });

    //     console.log('Records created:', records);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
