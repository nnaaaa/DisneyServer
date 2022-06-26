import { Inject } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { ServiceName } from 'src/shared/services'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'message' })
export class MessageGateway {
    @WebSocketServer()
    server: Server

    constructor(@Inject(ServiceName.MESSAGE) private messageClient:ClientKafka){}
}
