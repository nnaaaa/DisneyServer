import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { ChannelDto, MemberDto } from 'src/shared/dtos'
import { MessageSocketEmit } from 'src/shared/socket/emit'
import { MessageSocketEvent } from 'src/shared/socket/event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'
import { MessageService } from './message.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'message' })
export class MessageGateway {
    private readonly logger = new Logger(MessageGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private messageService: MessageService) {}

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MessageSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('message') createMessageDto: CreateMessageDto,
        @MessageBody('channel') destinationDto: ChannelDto,
        @MessageBody('member') authorDto: MemberDto
    ) {
        try {
            const newMessage = this.messageService.create(
                createMessageDto,
                destinationDto,
                authorDto
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

    @UseGuards(JwtWsGuard)
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

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(MessageSocketEvent.DELETE)
    async delete(@MessageBody() messageId: string) {
        try {
            this.messageService.deleteOne({ messageId })

            this.server.emit(`${MessageSocketEmit.DELETE}/${messageId}`, messageId)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }
}
