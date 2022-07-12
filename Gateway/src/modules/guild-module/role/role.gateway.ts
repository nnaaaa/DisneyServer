import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RoleEntity } from 'src/entities/role.entity'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { GuildDto } from 'src/shared/dtos'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { RoleSocketEmit } from 'src/shared/socket/emit'
import { RoleSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { ChannelRoleDto } from './dtos/channelRole.dto'
import { CreateRoleDto } from './dtos/createRole.dto'
import { MemberRoleDto } from './dtos/memberRole.dto'
import { UpdateRoleDto } from './dtos/updateRole.dto'
import { RoleService } from './role.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.ROLE })
export class RoleGateway {
    private readonly logger = new Logger(RoleGateway.name)
    @WebSocketServer()
    server: Server

    constructor(private roleService: RoleService) {}

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CREATE_ROLE'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.CREATE)
    async create(
        @MessageBody('role') createDto: CreateRoleDto,
        @MessageBody('guild') guild: GuildDto
    ) {
        try {
            const role = await this.roleService.create(createDto, guild)

            const savedRole = await this.roleService.save(role)

            this.server.emit(`${guild.guildId}/${RoleSocketEmit.CREATE}`, savedRole)

            return savedRole
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_ROLE'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.UPDATE)
    async update(@MessageBody('role') updateRoleDto: UpdateRoleDto) {
        try {
            const { roleId } = updateRoleDto

            await this.roleService.update({ roleId }, updateRoleDto)

            this.server.emit(`${RoleSocketEmit.UPDATE}/${roleId}`, updateRoleDto)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['DELETE_ROLE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(RoleSocketEvent.DELETE)
    async delete(@MessageBody('roleId') roleId: string) {
        try {
            await this.roleService.deleteOne({ roleId })
            this.server.emit(`${RoleSocketEmit.DELETE}/${roleId}`)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_ROLE'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.ADD_TO_MEMBER)
    async addToMember(@MessageBody('role') memberRoleDto: MemberRoleDto) {
        try {
            const { member, role } = await this.roleService.addToMember(memberRoleDto)

            this.server.emit(`${RoleSocketEmit.ADD_TO_MEMBER}/${role.roleId}`, {
                member,
                role,
            })

            return { member, role }
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_ROLE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(RoleSocketEvent.REMOVE_FROM_MEMBER)
    async removeFromMember(@MessageBody('role') memberRoleDto: MemberRoleDto) {
        try {
            const { member, role } = await this.roleService.removeFromMember(
                memberRoleDto
            )
            this.server.emit(`${RoleSocketEmit.REMOVE_FROM_MEMBER}/${role.roleId}`, {
                member,
                role,
            })
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_ROLE'])
    @UseGuards(GuildPermissionGuard)
    @UsePipes(new ValidationPipe())
    @SubscribeMessage(RoleSocketEvent.ADD_TO_CHANNEL)
    async addToChannel(@MessageBody('role') channelRoleDto: ChannelRoleDto) {
        try {
            const { role, channel } = await this.roleService.addToChannel(channelRoleDto)

            this.server.emit(`${RoleSocketEmit.ADD_TO_CHANNEL}/${role.roleId}`, {
                channel,
                role,
            })
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_ROLE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(RoleSocketEvent.REMOVE_FROM_CHANNEL)
    async removeFromChannel(@MessageBody('role') channelRoleDto: ChannelRoleDto) {
        try {
            const { role, channel } = await this.roleService.removeFromChannel(
                channelRoleDto
            )
            this.server.emit(`${RoleSocketEmit.REMOVE_FROM_CHANNEL}/${role.roleId}`, {
                channel,
                role,
            })
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
}
