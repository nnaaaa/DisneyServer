import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RoleGuard } from 'src/shared/decorators'
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

    // @UseGuards(JwtUserWsGuard)
    // @RoleGuard(['CUD_REACT'])
    //
    @SubscribeMessage(ReactSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(@MessageBody() createReactDto: CreateReactDto) {
        try {
            const reactMessage = await this.reactService.reactToMessage(createReactDto)

            if (reactMessage.type === 'create') {
                this.server.emit(
                    `${reactMessage.react.action.actionId}/${SocketNamespace.REACT}/${ReactSocketEmit.CREATE}`,
                    reactMessage.react
                )
            } else if (reactMessage.type === 'delete') {
                this.server.emit(
                    `${reactMessage.react.action.actionId}/${SocketNamespace.REACT}/${ReactSocketEmit.DELETE}`,
                    reactMessage.react
                )
            }
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    // @UseGuards(JwtUserWsGuard)
    // @RoleGuard(['CUD_REACT'])
    //
    // @SubscribeMessage(ReactSocketEvent.UPDATE)
    // @UsePipes(new ValidationPipe())
    // async update(
    //     @MessageBody('reactId') reactId: string,
    //     @MessageBody('emoji') emojiOfReactDto: EmojiDto
    // ) {
    //     try {
    //         const updatedReact = await this.reactService.updateOne(
    //             reactId,
    //             emojiOfReactDto
    //         )

    //         this.server.emit(`${ReactSocketEmit.UPDATE}/${reactId}`, updatedReact)
    //     } catch (e) {
    //         this.logger.error(e)
    //         return e
    //     }
    // }

    // @UseGuards(JwtUserWsGuard)
    // @RoleGuard(['CUD_REACT'])
    //
    // @SubscribeMessage(ReactSocketEvent.DELETE)
    // async delete(@MessageBody('reactId') reactId: string) {
    //     try {
    //         this.reactService.deleteOne({ reactId })

    //         this.server.emit(`${ReactSocketEmit.DELETE}/${reactId}`, reactId)
    //     } catch (e) {
    //         this.logger.error(e)
    //         return e
    //     }
    // }
}
