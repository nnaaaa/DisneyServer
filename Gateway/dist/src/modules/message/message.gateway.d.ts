import { ClientKafka } from '@nestjs/microservices';
import { Server } from 'socket.io';
export declare class MessageGateway {
    private messageClient;
    server: Server;
    constructor(messageClient: ClientKafka);
}
