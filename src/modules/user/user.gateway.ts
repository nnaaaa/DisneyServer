import {
  ClassSerializerInterceptor,
  Logger,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import {
  ChannelSocketEvent,
  UserSocketEvent,
} from 'src/shared/socket.event.constant'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { UpdateProfileDto } from './dtos/updateProfile.dto'
import { UserService } from './user.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'user' })
export class UserGateway {
  private readonly logger = new Logger(UserGateway.name)
  @WebSocketServer()
  public readonly server: Server

  constructor(private userService: UserService) {}

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('getProfile')
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

      return user
    } catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('addFriend')
  @UseInterceptors(ClassSerializerInterceptor)
  async addFriend(
    @MessageBody() friendId: string,
    @AuthWSUser() authUser: UserEntity
  ) {
    try {
      const beFriend = await this.userService.addFriend(
        authUser.userId,
        friendId
      )
      this.server.emit(
        `${UserSocketEvent.ADD_FRIEND}/${beFriend.rightUser.userId}`,
        beFriend
      )
      this.server.emit(
        `${UserSocketEvent.ADD_FRIEND}/${beFriend.leftUser.userId}`,
        beFriend
      )
      return beFriend
    } catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('acceptFriend')
  async acceptFriend(
    @MessageBody() friendId: string,
    @AuthWSUser() authUser: UserEntity
  ) {
    try {
      const beFriend = await this.userService.acceptFriend(
        authUser.userId,
        friendId
      )
      this.server.emit(
        `${UserSocketEvent.ACCEPT_FRIEND}/${beFriend.rightUser.userId}`,
        beFriend
      )
      this.server.emit(
        `${UserSocketEvent.ACCEPT_FRIEND}/${beFriend.leftUser.userId}`,
        beFriend
      )
    } catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('blockFriend')
  async block(
    @MessageBody() friendId: string,
    @AuthWSUser() authUser: UserEntity
  ) {
    try {
      const blockedFriend = await this.userService.blockFriend(
        authUser.userId,
        friendId
      )
      this.server.emit(
        `${UserSocketEvent.BLOCK_FRIEND}/${blockedFriend.rightUser.userId}`,
        blockedFriend
      )
      this.server.emit(
        `${UserSocketEvent.BLOCK_FRIEND}/${blockedFriend.leftUser.userId}`,
        blockedFriend
      )
    } catch (e) {
      this.logger.error(e)
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('updateProfile')
  @UsePipes(new ValidationPipe())
  async update(
    @AuthWSUser() authUser: UserEntity,
    @MessageBody() newProfile: UpdateProfileDto
  ) {
    try {
      await this.userService.updateOne({ userId: authUser.userId }, newProfile)

      for (const friend of authUser.friends)
        this.server.emit(`${UserSocketEvent.ONLINE}/${friend.id}`)
      for (const joinedChannel of authUser.joinedChannels)
        this.server.emit(
          `${ChannelSocketEvent.MEMBER_ONLINE}/${joinedChannel.channel}`
        )
    } catch (e) {
      this.logger.error(e)
    }
  }
}
