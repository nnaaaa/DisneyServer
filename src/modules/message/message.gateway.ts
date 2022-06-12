import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'message' })
export class MessageGateway {
  @WebSocketServer()
  server: Server
}
