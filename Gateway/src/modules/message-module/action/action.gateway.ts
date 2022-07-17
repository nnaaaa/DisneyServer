import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { MessageDto } from 'src/shared/dtos'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { ActionSocketEmit } from 'src/shared/socket/emit'
import { ActionSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { ActionService } from './action.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.ACTION })
export class ActionGateway {
    private readonly logger = new Logger(ActionGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private actionService: ActionService) {}

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CREATE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(ActionSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(@MessageBody('message') messageOfActionDto: MessageDto) {
        try {
            const action = await this.actionService.create({
                message: messageOfActionDto,
            })
            console.log(action)

            const savedAction = await this.actionService.save(action)

            this.server.emit(
                `${messageOfActionDto.messageId}/${ActionSocketEmit.CREATE}`,
                savedAction
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }

    // @UseGuards(JwtUserWsGuard)
    // @RolePermissions(['UPDATE_MESSAGE'])
    // @UseGuards(GuildPermissionGuard)
    // @SubscribeMessage(ActionSocketEvent.UPDATE)
    // @UsePipes(new ValidationPipe())
    // async update(
    //   @MessageBody('actionId') actionId: string,
    //   @MessageBody('emoji') emojiOfActionDto: EmojiDto
    // ) {
    //   try {
    //     const updatedAction = await this.actionService.updateOne(
    //       actionId,
    //       emojiOfActionDto
    //     )

    //     this.server.emit(`${ActionSocketEmit.UPDATE}/${actionId}`, updatedAction)
    //   } catch (e) {
    //     this.logger.error(e)
    //     return e
    //   }
    // }

    // @UseGuards(JwtUserWsGuard)
    // @RolePermissions(['CUD_Action'])
    // @UseGuards(GuildPermissionGuard)
    // @SubscribeMessage(ActionSocketEvent.DELETE)
    // async delete(@MessageBody('ActionId') ActionId: string) {
    //   try {
    //     this.actionService.deleteOne({ ActionId })

    //     this.server.emit(`${ActionSocketEmit.DELETE}/${ActionId}`, ActionId)
    //   } catch (e) {
    //     this.logger.error(e)
    //     return e
    //   }
    // }
}
