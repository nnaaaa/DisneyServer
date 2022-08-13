import {
    ClassSerializerInterceptor,
    Logger,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/shared/decorators/auth-user.decorator'
import { UserEntity, UserStatus } from 'src/entities/user.entity'
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity'
import { UserSocketEmit } from 'src/shared/socket/emit'
import { UserSocketEvent } from 'src/shared/socket/event'
import { JwtUserWsGuard } from '../auth/guards/jwtWSUser.guard'
import { UpdateProfileDto } from './dtos/updateProfile.dto'
import { UserService } from './user.service'
import { SocketNamespace } from 'src/shared/socket/namespace'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.USER })
export class UserGateway {
    private readonly logger = new Logger(UserGateway.name)
    @WebSocketServer()
    public readonly server: Server

    constructor(private userService: UserService) {}

    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(UserSocketEvent.ONLINE)
    async get(@AuthWSUser() authUser: UserEntity) {
        try {
            const user = await this.userService.updateOne(
                { userId: authUser.userId },
                { status: UserStatus.ONLINE }
            )

            this.server.emit(`${UserSocketEmit.ONLINE}/${user.userId}`, user)

            return user
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(UserSocketEvent.UPDATE_PROFILE)
    @UsePipes(new ValidationPipe())
    async update(
        @AuthWSUser() authUser: UserEntity,
        @MessageBody() newProfile: UpdateProfileDto
    ) {
        try {
            const user = await this.userService.updateOne(
                { userId: authUser.userId },
                newProfile
            )

            this.server.emit(`${UserSocketEmit.UPDATE_PROFILE}/${user.userId}`, user)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(UserSocketEvent.ADD_FRIEND)
    @UseInterceptors(ClassSerializerInterceptor)
    async addFriend(@MessageBody() friendId: string, @AuthWSUser() authUser: UserEntity) {
        try {
            const beFriend = await this.userService.addFriend(authUser.userId, friendId)
            this.friendInteractionNotify(UserSocketEmit.ADD_FRIEND, beFriend)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(UserSocketEvent.ACCEPT_FRIEND)
    async acceptFriend(
        @MessageBody() friendId: string,
        @AuthWSUser() authUser: UserEntity
    ) {
        try {
            const beFriend = await this.userService.acceptFriend(
                authUser.userId,
                friendId
            )
            this.friendInteractionNotify(UserSocketEmit.ACCEPT_FRIEND, beFriend)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(UserSocketEvent.BLOCK_FRIEND)
    async block(@MessageBody() friendId: string, @AuthWSUser() authUser: UserEntity) {
        try {
            const blockedFriend = await this.userService.blockFriend(
                authUser.userId,
                friendId
            )
            this.friendInteractionNotify(UserSocketEmit.BLOCK_FRIEND, blockedFriend)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    friendInteractionNotify(event: UserSocketEmit, befriend: UserBeFriendEntity) {
        this.server.emit(`${event}/${befriend.rightUser.userId}`, befriend)
        this.server.emit(`${event}/${befriend.leftUser.userId}`, befriend)
    }
}
