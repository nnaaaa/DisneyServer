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
import { GuildSocketEmit } from 'src/shared/socket/emit'
import { GuildSocketEvent } from 'src/shared/socket/event'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { MemberService } from '../member/member.service'
import { RoleService } from '../role/role.service'
import { CreateGuildDto } from './dtos/createGuild.dto'
import { UpdateGuildDto } from './dtos/updateGuild.dto'
import { GuildService } from './guild.service'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { SocketNamespace } from 'src/shared/socket/namespace'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.GUILD })
export class GuildGateway {
    private readonly logger = new Logger(GuildGateway.name)
    @WebSocketServer()
    public readonly server: Server

    constructor(
        private guildService: GuildService,
        private memberService: MemberService // private roleService: RoleService
    ) {}

    /** @return GuildEntity after save */
    @UseGuards(JwtUserWsGuard)
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
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_GUILD'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(GuildSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateGuildDto: UpdateGuildDto) {
        try {
            await this.guildService.updateOne(
                { guildId: updateGuildDto.guildId },
                updateGuildDto
            )
            this.server.emit(
                `${GuildSocketEmit.UPDATE}/${updateGuildDto.guildId}`,
                updateGuildDto
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    /** @return GuildEntity */
    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(GuildSocketEvent.GET_ONE)
    async getOne(@MessageBody() guildId: string, @AuthWSUser() authUser: UserEntity) {
        try {
            const guild = await this.guildService.findOneWithRelation({ guildId })
            const member = guild.members.find((m) => m.user?.userId === authUser.userId)
            // O(n^3)
            // for (let ctg of guild.categories) {
            //     ctg.channels = ctg.channels.filter((channel) => {
            //         if (!channel.isPrivate) return true

            //         // if user are member of channel
            //         for (let member of channel.members) {
            //             if (member.user.userId === authUser.userId) {
            //                 return true
            //             }
            //         }

            //         // if user own role which channel have
            //         for (let role of channel.roles) {
            //             for (let member of role.members) {
            //                 if (member.user.userId === authUser.userId) {
            //                     return true
            //                 }
            //             }
            //         }

            //         return false
            //     })
            // }
            return { guild, member }
            // return guild
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    /** @return GuildEntity[] */
    @UseGuards(JwtUserWsGuard)
    @SubscribeMessage(GuildSocketEvent.GET_JOINED)
    async getOfMe(@AuthWSUser() { userId }: UserEntity) {
        try {
            const joinedGuilds = await this.memberService.findManyWithRelation({
                user: { userId },
            })
            return joinedGuilds
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['DELETE_GUILD'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(GuildSocketEvent.DELETE)
    async delete(@MessageBody('guildId') guildId: string) {
        try {
            await this.guildService.deleteOne({ guildId })
            this.server.emit(`${GuildSocketEmit.DELETE}/${guildId}`)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
}
