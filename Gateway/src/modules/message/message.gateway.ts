
import { Inject, Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets'
import { plainToInstance } from 'class-transformer'
import { mergeMap } from 'rxjs'
import { Server } from 'socket.io'
import { AuthWSUser } from 'src/decorators/auth-user.decorator'
import { Message } from 'src/entities/messageService/message.model'
import { UserEntity } from 'src/entities/user.entity'
import { ServiceName } from 'src/shared/services'
import { MessageSocketEvent } from 'src/shared/socket.event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { ChannelService } from '../channel/channel.service'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'
import { MessageService } from './message.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'message' })
export class MessageGateway {
    private readonly logger = new Logger(MessageGateway.name)

    @WebSocketServer()
    server: Server

    constructor(
        private messageService: MessageService,
        private channelService: ChannelService
    ) { }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MessageSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @AuthWSUser() authUser: UserEntity,
        @MessageBody('message') createMessageDto: CreateMessageDto,
        @MessageBody('channelId') channelId: string
    ) {
        try {
            const channel = await this.channelService.findOne({ channelId })
            
            const newMessage = this.messageService.create(createMessageDto, channel, authUser)

            const savedMessage = await this.messageService.save(newMessage)

            this.server.emit(`${channelId}/${MessageSocketEvent.CREATE}`, savedMessage)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MessageSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(
        @MessageBody() updateMessageDto: UpdateMessageDto
    ) {
        try {
            this.messageService.updateOne(updateMessageDto)

            this.server.emit(`${MessageSocketEvent.UPDATE}/${updateMessageDto.messageId}`,updateMessageDto)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MessageSocketEvent.DELETE)
    @UsePipes(new ValidationPipe())
    async delete(
        @MessageBody() messageId: string
    ) {
        try {
            this.messageService.deleteOne({ messageId })
            
            this.server.emit(`${MessageSocketEvent.DELETE}/${messageId}`, messageId)

        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }
}
