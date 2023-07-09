import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

export interface sseSubsType {
    processId: string;
    broadcast: (chunk: EventMessage) => void;
}

export interface EventMessage {
    // Message payload
    data?: string;
    // Message identifier, if set, client will send `Last-Event-ID: <id>` header on reconnect
    id?: string;
    // Message type
    event?: string;
    // Update client reconnect interval (how long will client wait before trying to reconnect).
    retry?: number;
    // Message comment
    comment?: string;
}

export function sseRouteHandler(request: FastifyRequest, reply: FastifyReply) {
    Object.entries(reply.getHeaders()).forEach(([key, value]) => {
        reply.raw.setHeader(key, value ?? '');
    });
    reply.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    reply.raw.setHeader('Connection', 'keep-alive');
    reply.raw.setHeader('Cache-Control', 'no-cache,no-transform');
    reply.raw.setHeader('x-no-compression', 1);

    // Generate subscriber data bind process id with HTTP response object
    const processId = uuidv4().substring(0, 8);
    const initData = {
        processId,
        startProcessAt: Date.now(),
        type: 'init-connection',
    };
    reply.raw.write(serializeSSEEvent({ data: JSON.stringify(initData) }));
    console.log(`${processId} ${JSON.stringify(initData)}`);

    const newSub: sseSubsType = {
        processId,
        broadcast: function (chunk: EventMessage) {
            reply.raw.write(serializeSSEEvent(chunk));
        },
    };
    request.server.sseSubs.push(newSub);

    request.socket.on('close', () => {
        console.log(`${processId} connection closed`);
        request.server.sseSubs = request.server.sseSubs.filter(
            (s) => s.processId !== processId,
        );
        reply.raw.end();
    });
}

export function serializeSSEEvent(chunk: EventMessage): string {
    let payload = '';
    if (chunk.id) {
        payload += `id: ${chunk.id}\n`;
    }
    if (chunk.event) {
        payload += `event: ${chunk.event}\n`;
    }
    if (chunk.data) {
        payload += `data: ${chunk.data}\n`;
    }
    if (chunk.retry) {
        payload += `retry: ${chunk.retry}\n`;
    }
    if (chunk.comment) {
        payload += `:${chunk.comment}\n`;
    }
    if (!payload) {
        return '';
    }
    payload += '\n';
    return payload;
}

// function sendSSE(res: FastifyReply) {
//     res.raw.write(serializeSSEEvent({ data: 'hello' }));
//     setTimeout(() => sendSSE(res), 3000);
// }
