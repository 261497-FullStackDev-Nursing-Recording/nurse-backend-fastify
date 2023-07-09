import bcrypt from 'fastify-bcrypt';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
    fastify.register(bcrypt, {
        saltWorkFactor: 12,
    });
});
