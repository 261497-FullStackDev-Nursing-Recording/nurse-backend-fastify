import { PrismaClient } from '@prisma/client';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';

const prisma = new PrismaClient();

async function main() {
    // const admin = await prisma.user.create({
    //     data: {
    //         f_name: 'Admin',
    //         l_name: 'Admin',
    //         username: 'admin',
    //         password: 'password',

    //         role: 'ADMIN',
    //     },
    // });
    const app = fastify();
    app.register(fastifyBcrypt);
    await app.ready();

    // const hash = await app.bcrypt.hash('test');
    // console.log('test' + hash.toString());

    const users = await prisma.user.createMany({
        data: [
            // {
            //     f_name: 'User1',
            //     l_name: 'User1',
            //     username: 'user1',
            //     password: 'password',
            //     role: 'NURSE',
            // },
            // {
            //     f_name: 'User2',
            //     l_name: 'User2',
            //     username: 'user2',
            //     password: 'password',
            //     role: 'NURSE',
            // },
            {
                f_name: 'User3',
                l_name: 'User3',
                username: 'user3',
                password: (await app.bcrypt.hash('password')).toString(),
                role: 'NURSE',
            },
            // {
            //     f_name: 'Admin1',
            //     l_name: 'Admin1',
            //     username: 'admin1',
            //     password: 'password',
            //     role: 'ADMIN',
            // },
        ],
    });

    // console.log('Admin created:', admin);
    console.log('Users created:', users);
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
