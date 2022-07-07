import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { RolePermissions } from 'src/shared/decorators/role-permission.decorator'
import { ChannelDto, MemberDto, MessageDto } from 'src/shared/dtos'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { MessageSocketEmit } from 'src/shared/socket/emit'
import { MessageSocketEvent } from 'src/shared/socket/event'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'
import { MessageService } from './message.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'message' })
export class MessageGateway {
    private readonly logger = new Logger(MessageGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private messageService: MessageService) {}

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CREATE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(MessageSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('message') createMessageDto: CreateMessageDto,
        @MessageBody('channel') destinationDto: ChannelDto,
        @MessageBody('member') authorDto: MemberDto,
        @MessageBody('replyTo') replyTo: string
    ) {
        try {
            const newMessage = await this.messageService.create(
                createMessageDto,
                destinationDto,
                authorDto,
                replyTo
            )

            const savedMessage = await this.messageService.save(newMessage)

            this.server.emit(
                `${destinationDto.channelId}/${MessageSocketEmit.CREATE}`,
                savedMessage
            )

            this.server.emit(`${MessageSocketEmit.CREATE}`, savedMessage)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(MessageSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
        try {
            this.messageService.updateOne(updateMessageDto)

            this.server.emit(
                `${MessageSocketEmit.UPDATE}/${updateMessageDto.messageId}`,
                updateMessageDto
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['DELETE_MESSAGE'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(MessageSocketEvent.DELETE)
    async delete(@MessageBody('messageId') messageId: string) {
        try {
            this.messageService.deleteOne({ messageId })

            this.server.emit(`${MessageSocketEmit.DELETE}/${messageId}`, messageId)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }
}
