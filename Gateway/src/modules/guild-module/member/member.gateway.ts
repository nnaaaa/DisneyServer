import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/shared/decorators/auth-user.decorator'
import { UserEntity } from 'src/entities/user.entity'
import { GuildDto } from 'src/shared/dtos/guild.dto'
import { MemberSocketEmit } from 'src/shared/socket/emit'
import { MemberSocketEvent } from 'src/shared/socket/event'
import { JwtWsGuard } from '../../auth-module/auth/guards/jwtWS.guard'
import { UpdateMemberDto } from './dtos/updateMember.dto'
import { MemberService } from './member.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'member' })
export class MemberGateway {
    private readonly logger = new Logger(MemberGateway.name)
    @WebSocketServer()
    public readonly server: Server

    constructor(private memberService: MemberService) {}

    /** @return GuildEntity which user have joined */
    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MemberSocketEvent.JOIN)
    async joinGuild(
        @MessageBody('guild') guildOfMemberDto: GuildDto,
        @AuthWSUser() authUser: UserEntity
    ) {
        try {
            const newMember = await this.memberService.create(guildOfMemberDto, authUser)

            const savedMember = await this.memberService.save(newMember)

            this.server.emit(
                `${guildOfMemberDto.guildId}/${MemberSocketEmit.JOIN}`,
                savedMember
            )

            // if channel was private, it wouldn't been seen
            // for (let ctg of guild.categories) {
            //     ctg.channels = ctg.channels.filter((channel) => {
            //         if (!channel.isPrivate) return true
            //         return false
            //     })
            // }

            // emit to all channel which user have joined
            // this.channelGateway.channelMemberNotify(
            //     ChannelSocketEmit.USER_JOIN,
            //     newMember
            // )

            // return newMember
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MemberSocketEvent.LEAVE)
    async leaveGuild(@MessageBody() memberId: string) {
        try {
            const memberLeaveGuild = await this.memberService.deleteOne({ memberId })
            console.log(memberLeaveGuild)
            this.server.emit(`${MemberSocketEmit.LEAVE}/${memberId}`, memberLeaveGuild)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(MemberSocketEvent.UPDATE)
    async updateMember(@MessageBody() updateMemberDto: UpdateMemberDto) {
        try {
            const member = await this.memberService.updateOne(
                {
                    memberId: updateMemberDto.memberId,
                },
                updateMemberDto
            )

            this.server.emit(`${MemberSocketEmit.UPDATE}/${member.memberId}`, member)
        } catch (e) {
            this.logger.error(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MemberSocketEvent.ONLINE)
    memberOnline(@MessageBody() memberId: string) {
        this.server.emit(`${MemberSocketEmit.ONLINE}/${memberId}`)
    }
}
