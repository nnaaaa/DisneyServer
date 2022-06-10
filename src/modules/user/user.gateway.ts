import { UseGuards } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthUser } from 'src/decorators/auth-user.decorator'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { AddFriendDto } from './dtos/addFriend.dto'
import { UserService } from './user.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'user' })
export class UserGateway {
  @WebSocketServer()
  server: Server

  constructor(private userService: UserService) {}

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('addFriend')
  async addFriend(@MessageBody() payload: AddFriendDto, @AuthUser() user) {
    console.log({ user })
    try {
    } catch (e) {}
  }
}
