import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default fp(async (fastify, opts) => {
  fastify.decorate("prisma", prisma);
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    prisma: PrismaClient;
  }
}
