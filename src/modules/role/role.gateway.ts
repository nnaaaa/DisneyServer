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
import { CreateRoleDto } from './dtos/createRole.dto'
import { UpdateRoleDto } from './dtos/updateRole.dto'
import { RoleService } from './role.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'role' })
export class RoleGateway {
    private readonly logger = new Logger(RoleGateway.name)
    @WebSocketServer()
    server: Server

    constructor(private roleService: RoleService) { }

    // @UseGuards(JwtWsGuard)
    // @SubscribeMessage('get-one')
    // async getOne(@MessageBody() roleId: string) {
    //     try {
    //         const role = await this.roleService.findOneWithReletion({ roleId })

    //         return role
    //     } catch (e) {
    //         this.logger.error(e)
    //         throw new WsException(e)
    //     }
    // }

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
}
