import swagger, { SwaggerOptions } from '@fastify/swagger';
import swaggerUI, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import fp from 'fastify-plugin';

export const optionsSwagger: SwaggerOptions = {
    swagger: {
        info: {
            title: 'API Documentations',
            description: 'API Documentations',
            version: '0.1.0',
        },
    },
};

export const optionsSwaggerUI: FastifySwaggerUiOptions = {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true,
};

export default fp(async (fastify, opts) => {
    fastify.register(swagger, optionsSwagger);
    fastify.register(swaggerUI, optionsSwaggerUI);
});
