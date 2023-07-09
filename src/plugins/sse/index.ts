import fp from 'fastify-plugin';

import { type sseSubsType } from './utils';

declare module 'fastify' {
    export interface FastifyInstance {
        sseSubs: sseSubsType[];
    }
}

const sseSubs: sseSubsType[] = [];

export default fp(async (fastify, opts) => {
    fastify.decorate('sseSubs', sseSubs);
});
