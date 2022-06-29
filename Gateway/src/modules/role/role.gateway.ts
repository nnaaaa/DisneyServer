import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RoleSocketEmit } from 'src/shared/socket.emit'
import { RoleSocketEvent } from 'src/shared/socket.event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { MemberRoleDto } from './dtos/memberRole.dto'
import { CreateRoleDto } from './dtos/createRole.dto'
import { UpdateRoleDto } from './dtos/updateRole.dto'
import { RoleService } from './role.service'
import { ChannelRoleDto } from './dtos/channelRole.dto'
import { ChannelGateway } from '../channel/channel.gateway'
import { RoleEntity } from 'src/entities/role.entity'
import { GuildGateway } from '../guild/guild.gateway'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'role' })
export class RoleGateway {
    private readonly logger = new Logger(RoleGateway.name)
    @WebSocketServer()
    server: Server

    constructor(
        private roleService: RoleService,
        private channelGateway: ChannelGateway,
        private guildGateway: GuildGateway
    ) {}

    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.CREATE)
    async create(
        @MessageBody('role') createDto: CreateRoleDto,
        @MessageBody('guildId') guildId: string
    ) {
        try {
            const role = await this.roleService.createByGuildIdAndSave(createDto, guildId)

            this.server.emit(`${guildId}/${RoleSocketEmit.CREATE}`, role)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.UPDATE)
    async update(@MessageBody() updateRoleDto: UpdateRoleDto) {
        try {
            const { roleId } = updateRoleDto

            await this.roleService.update({ roleId }, updateRoleDto)

            this.server.emit(`${RoleSocketEmit.UPDATE}/${roleId}`, updateRoleDto)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.DELETE)
    async delete(@MessageBody() roleId: string) {
        try {
            await this.roleService.delete({ roleId })
            this.server.emit(`${RoleSocketEmit.DELETE}/${roleId}`)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.ADD_TO_MEMBER)
    async addToMember(@MessageBody() memberRoleDto: MemberRoleDto) {
        try {
            const { member, role } = await this.roleService.addToMember(memberRoleDto)

            this.updateNotify(role)

            this.guildGateway.memberUpdateNotify(member)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(RoleSocketEvent.REMOVE_FROM_MEMBER)
    async removeFromMember(@MessageBody() memberRoleDto: MemberRoleDto) {
        try {
            const { member, role } = await this.roleService.removeFromMember(
                memberRoleDto
            )

            this.updateNotify(role)

            this.guildGateway.memberUpdateNotify(member)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.ADD_TO_CHANNEL)
    async addToChannel(@MessageBody() channelRoleDto: ChannelRoleDto) {
        try {
            const { role, channel } = await this.roleService.addToChannel(channelRoleDto)

            this.updateNotify(role)

            this.channelGateway.updateNotify(channel)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(RoleSocketEvent.REMOVE_FROM_CHANNEL)
    async removeFromChannel(@MessageBody() channelRoleDto: ChannelRoleDto) {
        try {
            const { role, channel } = await this.roleService.removeFromChannel(
                channelRoleDto
            )

            this.updateNotify(role)

            this.channelGateway.updateNotify(channel)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    updateNotify(role: RoleEntity) {
        this.server.emit(`${RoleSocketEmit.UPDATE}/${role.roleId}`, role)
    }
}
