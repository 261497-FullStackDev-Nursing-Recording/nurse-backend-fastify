import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync, RouteHandlerMethod } from 'fastify';

const GETPatients = Type.Array(
    Type.Object({
        id: Type.String(),
        f_name: Type.String(),
        l_name: Type.String(),
        hn: Type.String(),
        status: Type.String(),
    }),
);

const patients: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.addHook('onRequest', async (req, res) => {
        try {
            await req.jwtVerify();
        } catch (err) {
            res.send(err);
        }
    });

    //get all patients from database
    fastify.route({
        method: 'GET',
        url: '/get_all',
        schema: {
            response: {
                200: GETPatients,
            },
        },
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: async (req, res) => {
            try {
                const patients = await fastify.prisma.patient.findMany();

                return patients;
            } catch (err) {
                res.send(err);
            }
        },
    });

    //create search by using hn number
    /**
     * example of this api call
     *
     *  localhost5001/patient/get_hn/{hn}
     *  by {hn} is the parameter that you want to search
     */

    interface HNParams {
        hn: string;
    }

    interface SearchName {
        f_name?: string;
        l_name?: string;
    }

    const getHNHandler: RouteHandlerMethod = async (req, res) => {
        const { hn } = req.params as HNParams;
        const { f_name, l_name } = req.query as SearchName;

        try {
            const patients = await fastify.prisma.patient.findMany({
                where: {
                    OR: [{ hn }, { f_name }, { l_name }],
                },
            });

            return patients;
        } catch (err) {
            res.send(err);
        }
    };

    fastify.route({
        method: 'GET',
        url: '/search/:hn',
        schema: {
            params: {
                type: 'object',
                properties: {
                    hn: { type: 'string' },
                },
            },
            querystring: {
                type: 'object',
                properties: {
                    f_name: { type: 'string' },
                    l_name: { type: 'string' },
                },
            },
        },
        preHandler: fastify.auth([fastify.verifyJWT]),
        handler: getHNHandler,
    });
};

export default patients;
