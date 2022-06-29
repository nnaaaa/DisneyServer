import { instanceToPlain } from 'class-transformer'
import {
    ClassSerializerInterceptor,
    Inject,
    Logger,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { UserBeFriendEntity } from 'src/entities/userBeFriend.entity'
import { UserPatternEvent } from 'src/shared/event.pattern'
import { ServiceName } from 'src/shared/services'
import { ChannelSocketEmit, UserSocketEmit } from 'src/shared/socket.emit'
import { UserSocketEvent } from 'src/shared/socket.event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { ChannelGateway } from '../channel/channel.gateway'
import { GuildMemberService } from './../guild-member/guild-member.service'
import { UpdateProfileDto } from './dtos/updateProfile.dto'
import { UserService } from './user.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'user' })
export class UserGateway {
    private readonly logger = new Logger(UserGateway.name)
    @WebSocketServer()
    public readonly server: Server

    constructor(
        private userService: UserService,
        private guildMemberService: GuildMemberService,
        private channelGateway: ChannelGateway,
        @Inject(ServiceName.MESSAGE) private messageClient: ClientKafka
    ) {}

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(UserSocketEvent.ONLINE)
    async get(@AuthWSUser() authUser: UserEntity) {
        try {
            const user = await this.userService.updateOne(
                { userId: authUser.userId },
                { isOnline: true }
            )

            this.server.emit(`${UserSocketEmit.ONLINE}/${user.userId}`, user)

            const joinedGuilds = await this.guildMemberService.findManyWithRelation({
                user: { userId: authUser.userId },
            })

            // emit to all channels of all guilds which user joined
            for (const joinedGuild of joinedGuilds) {
                this.channelGateway.channelMemberNotify(
                    ChannelSocketEmit.USER_ONLINE,
                    joinedGuild
                )
            }

            return user
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
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
            this.messageClient.emit(UserPatternEvent.UPDATE, instanceToPlain(user))

            this.server.emit(`${UserSocketEmit.UPDATE_PROFILE}/${user.userId}`, user)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(UserSocketEvent.ADD_FRIEND)
    @UseInterceptors(ClassSerializerInterceptor)
    async addFriend(@MessageBody() friendId: string, @AuthWSUser() authUser: UserEntity) {
        try {
            const beFriend = await this.userService.addFriend(authUser.userId, friendId)
            this.friendInteractionNotify(UserSocketEmit.ADD_FRIEND, beFriend)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
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
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
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
            throw new WsException(e)
        }
    }

    friendInteractionNotify(event: UserSocketEmit, befriend: UserBeFriendEntity) {
        this.server.emit(`${event}/${befriend.rightUser.userId}`, befriend)
        this.server.emit(`${event}/${befriend.leftUser.userId}`, befriend)
    }
}
