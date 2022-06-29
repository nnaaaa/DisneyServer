import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/decorators/auth-user.decorator'
import { GuildMemberEntity } from 'src/entities/guildMember.entity'
import { UserEntity } from 'src/entities/user.entity'
import { ChannelSocketEmit, GuildSocketEmit } from 'src/shared/socket.emit'
import { GuildSocketEvent } from 'src/shared/socket.event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { ChannelGateway } from '../channel/channel.gateway'
import { GuildMemberService } from '../guild-member/guild-member.service'
import { RoleService } from '../role/role.service'
import { CreateGuildDto } from './dtos/createGuild.dto'
import { UpdateGuildDto } from './dtos/updateGuild.dto'
import { GuildService } from './guild.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'guild' })
export class GuildGateway {
    private readonly logger = new Logger(GuildGateway.name)
    @WebSocketServer()
    public readonly server: Server

    constructor(
        private guildService: GuildService,
        private guildMemberService: GuildMemberService,
        private roleService: RoleService,
        private channelGateway: ChannelGateway
    ) {}

    /** @return GuildEntity after save */
    @UseGuards(JwtWsGuard)
    @SubscribeMessage(GuildSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @AuthWSUser() authUser: UserEntity,
        @MessageBody() createGuildDto: CreateGuildDto
    ) {
        try {
            return await this.guildService.createTemplateGuild(createGuildDto, authUser)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(GuildSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateGuildDto: UpdateGuildDto) {
        try {
            await this.guildService.updateOneGuild(
                { guildId: updateGuildDto.guildId },
                updateGuildDto
            )
            this.server.emit(
                `${GuildSocketEmit.UPDATE}/${updateGuildDto.guildId}`,
                updateGuildDto
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    /** @return GuildEntity */
    @UseGuards(JwtWsGuard)
    @SubscribeMessage(GuildSocketEvent.GET_ONE)
    async getOne(@MessageBody() guildId: string, @AuthWSUser() authUser: UserEntity) {
        try {
            const guild = await this.guildService.findOneGuildWithRelation({ guildId })
            const member = guild.members.find((m) => m.user.userId === authUser.userId)
            // O(n^3)
            for (let ctg of guild.categories) {
                ctg.channels = ctg.channels.filter((channel) => {
                    if (!channel.isPrivate) return true

                    // if user are member of channel
                    for (let member of channel.members) {
                        if (member.user.userId === authUser.userId) {
                            return true
                        }
                    }

                    // if user own role which channel have
                    for (let role of channel.roles) {
                        for (let member of role.members) {
                            if (member.user.userId === authUser.userId) {
                                return true
                            }
                        }
                    }

                    return false
                })
            }
            return { guild, member }
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    /** @return GuildEntity[] */
    @UseGuards(JwtWsGuard)
    @SubscribeMessage(GuildSocketEvent.GET_JOINED)
    async getOfMe(@AuthWSUser() { userId }: UserEntity) {
        try {
            const joinedGuilds = await this.guildMemberService.findManyWithRelation({
                user: { userId },
            })
            const guilds = joinedGuilds.map((j) => j.guild)
            return guilds
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(GuildSocketEvent.DELETE)
    async delete(@MessageBody() guildId: string) {
        try {
            await this.guildService.deleteGuild({ guildId })
            this.server.emit(`${GuildSocketEmit.DELETE}/${guildId}`)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    /** @return GuildEntity which user have joined */
    @UseGuards(JwtWsGuard)
    @SubscribeMessage(GuildSocketEvent.JOIN_GUILD)
    async joinGuild(@MessageBody() guildId: string, @AuthWSUser() authUser: UserEntity) {
        try {
            const { guild, newMember } = await this.guildService.joinGuild(
                guildId,
                authUser
            )

            // emit to guild
            this.server.emit(`${guildId}/${GuildSocketEmit.MEMBER_JOIN}`, newMember)

            // if channel was private, it wouldn't been seen
            for (let ctg of guild.categories) {
                ctg.channels = ctg.channels.filter((channel) => {
                    if (!channel.isPrivate) return true
                    return false
                })
            }

            // emit to all channel which user have joined
            this.channelGateway.channelMemberNotify(
                ChannelSocketEmit.USER_JOIN,
                newMember
            )

            return { guild, member: newMember }
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(GuildSocketEvent.LEAVE_GUILD)
    async leaveGuild(@MessageBody() guildId: string, @AuthWSUser() authUser: UserEntity) {
        try {
            const memberLeaveGuild = await this.guildService.leaveGuild(
                authUser.userId,
                guildId
            )
            // emit to guild
            this.server.emit(
                `${GuildSocketEmit.MEMBER_LEAVE}/${memberLeaveGuild.guildMemberId}`,
                memberLeaveGuild
            )

            // emit to all channel which user have joined
            this.channelGateway.channelMemberNotify(
                ChannelSocketEmit.USER_LEAVE,
                memberLeaveGuild
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(GuildSocketEvent.MEMBER_UPDATE)
    async updateMember(
        @MessageBody() updateJoinGuildDto: UpdateGuildDto,
        @AuthWSUser() authUser: UserEntity
    ) {
        try {
            const member = await this.guildMemberService.updateOne(
                {
                    guild: { guildId: updateJoinGuildDto.guildId },
                    user: { userId: authUser.userId },
                },
                updateJoinGuildDto
            )

            this.memberUpdateNotify(member)

            // emit to all channel which user have joined
            this.channelGateway.channelMemberNotify(ChannelSocketEmit.USER_UPDATE, member)
        } catch (e) {
            this.logger.error(e)
        }
    }

    memberUpdateNotify(member: GuildMemberEntity) {
        this.server.emit(
            `${GuildSocketEmit.MEMBER_UPDATE}/${member.guildMemberId}`,
            member
        )
    }
}
