import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { EmojiDto } from 'src/shared/dtos'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { ReactSocketEmit } from 'src/shared/socket/emit'
import { ReactSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { CreateReactDto } from './dtos/createReact.dto'
import { ReactService } from './react.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.REACT })
export class ReactGateway {
    private readonly logger = new Logger(ReactGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private reactService: ReactService) {}

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CUD_REACT'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(ReactSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(@MessageBody() createReactDto: CreateReactDto) {
        try {
            const react = await this.reactService.reactToMessage(createReactDto)

            this.server.emit(
                `${createReactDto.action.actionId}/${ReactSocketEmit.CREATE}`,
                react
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CUD_REACT'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(ReactSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(
        @MessageBody('reactId') reactId: string,
        @MessageBody('emoji') emojiOfReactDto: EmojiDto
    ) {
        try {
            const updatedReact = await this.reactService.updateOne(
                reactId,
                emojiOfReactDto
            )

            this.server.emit(`${ReactSocketEmit.UPDATE}/${reactId}`, updatedReact)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CUD_REACT'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(ReactSocketEvent.DELETE)
    async delete(@MessageBody('reactId') reactId: string) {
        try {
            this.reactService.deleteOne({ reactId })

            this.server.emit(`${ReactSocketEmit.DELETE}/${reactId}`, reactId)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
}
