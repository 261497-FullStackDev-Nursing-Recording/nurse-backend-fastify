// import { Type } from '@sinclair/typebox';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';

import { searchPatient } from './services';
// import { RouteHandlerMethod } from 'fastify';
import { SearchPatientsReq } from './types';

const patients: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();
    fastify.addHook('onRequest', async (req, res) => {
        try {
            await req.jwtVerify();
        } catch (err) {
            res.send(err);
        }
    });

    server.route({
        method: 'POST',
        url: '/search',
        schema: {
            body: SearchPatientsReq,
        },
        handler: async (req, rep) => {
            try {
                const body: any = req.body;
                const patients = searchPatient(server, body);
                return patients;
            } catch (err) {
                rep.code(500).send(err);
            }
        },
    });
};

export default patients;
