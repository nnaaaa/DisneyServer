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
import { AuthWSUser } from 'src/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
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
        private channelGateway: ChannelGateway
    ) { }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(UserSocketEvent.GET_PROFILE)
    async get(@AuthWSUser() authUser: UserEntity) {
        try {
            const user = await this.userService.updateOne(
                { userId: authUser.userId },
                { isOnline: true }
            )

            this.server.emit(`${UserSocketEmit.UPDATE_PROFILE}/${user.userId}`, user)

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
            const user = await this.userService.updateOne({ userId: authUser.userId }, newProfile)

            this.server.emit(`${UserSocketEmit.UPDATE_PROFILE}/${user.userId}`, user)


            const joinedGuilds = await this.guildMemberService.findManyWithRelation({
                user: { userId: authUser.userId },
            })

            // emit to all channels of all guilds which user joined
            for (const joinedGuild of joinedGuilds) {
                this.channelGateway.guildMemberNotify(ChannelSocketEmit.USER_UPDATE, joinedGuild)
            }


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
            this.server.emit(
                `${UserSocketEmit.ADD_FRIEND}/${beFriend.rightUser.userId}`,
                beFriend
            )
            this.server.emit(
                `${UserSocketEmit.ADD_FRIEND}/${beFriend.leftUser.userId}`,
                beFriend
            )
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
            this.server.emit(
                `${UserSocketEmit.ACCEPT_FRIEND}/${beFriend.rightUser.userId}`,
                beFriend
            )
            this.server.emit(
                `${UserSocketEmit.ACCEPT_FRIEND}/${beFriend.leftUser.userId}`,
                beFriend
            )
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
            this.server.emit(
                `${UserSocketEmit.BLOCK_FRIEND}/${blockedFriend.rightUser.userId}`,
                blockedFriend
            )
            this.server.emit(
                `${UserSocketEmit.BLOCK_FRIEND}/${blockedFriend.leftUser.userId}`,
                blockedFriend
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }


}
