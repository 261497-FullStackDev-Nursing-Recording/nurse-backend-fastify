import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';

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
    interface HN {
        hn: string;
    }
    fastify.route({
        method: 'GET',
        url: '/get_hn/:hn',
        schema: {
            querystring: {
                hn: { type: 'string' },
            },
        },
        preHandler: fastify.auth([fastify.verifyJWT]),

        handler: async (req, res) => {
            const { hn } = req.params as HN;
            console.log('???' + hn);
            try {
                const patiens = await fastify.prisma.patient.findMany({
                    where: {
                        hn: hn,
                    },
                });
                return patiens;
            } catch (err) {
                res.send(err);
            }
        },
    });
};

export default patients;
