import { ClassSerializerInterceptor, Logger, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { ChannelSocketEvent, UserSocketEvent } from 'src/shared/socket.event.constant'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { UpdateProfileDto } from './dtos/updateProfile.dto'
import { UserService } from './user.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'user' })
export class UserGateway {
  private readonly logger = new Logger(UserGateway.name)
  @WebSocketServer()
  public readonly server: Server

  constructor(private userService: UserService) { }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('getProfile')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(@AuthWSUser() authUser: UserEntity) {
    try {
      await this.userService.updateOne(
        { userId: authUser.userId },
        { isOnline: true }
      )
      const user = await this.userService.findOne({
        userId: authUser.userId,
      })
      for (const friend of user.friends)
        this.server.emit(`${UserSocketEvent.ONLINE}/${friend.id}`)

      return new UserEntity(user)
    }
    catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('addFriend')
  async addFriend(@MessageBody() friendId: string, @AuthWSUser() authUser: UserEntity) {
    try {
      const beFriend = await this.userService.addFriend(authUser.userId, friendId)
      this.server.emit(
        `${UserSocketEvent.ADD_FRIEND}/${beFriend.rightUser.userId}`,
        beFriend
      )
    }
    catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('updateProfile')
  @UsePipes(new ValidationPipe())
  async update(
    @AuthWSUser() authUser: UserEntity, @MessageBody() newProfile: UpdateProfileDto
  ) {
    try {
      await this.userService.updateOne({ userId: authUser.userId }, newProfile)

      for (const friend of authUser.friends)
        this.server.emit(`${UserSocketEvent.ONLINE}/${friend.id}`)
      for (const joinedChannel of authUser.joinedChannels)
        this.server.emit(
          `${ChannelSocketEvent.MEMBER_ONLINE}/${joinedChannel.channel}`
        )
    }
    catch (e) {
      this.logger.error(e)
    }
  }
}
