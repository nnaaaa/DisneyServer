import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { EmojiDto, MemberDto, MessageDto } from 'src/shared/dtos'
import { ReactSocketEmit } from 'src/shared/socket/emit'
import { ReactSocketEvent } from 'src/shared/socket/event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { ReactService } from './react.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'react' })
export class ReactGateway {
    private readonly logger = new Logger(ReactGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private reactService: ReactService) {}

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(ReactSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('emoji') emojiOfReactDto: EmojiDto,
        @MessageBody('message') messageOfReactDto: MessageDto,
        @MessageBody('author') authorOfReactDto: MemberDto
    ) {
        try {
            const react = await this.reactService.reactToMessage(
                emojiOfReactDto,
                messageOfReactDto,
                authorOfReactDto
            )

            this.server.emit(
                `${messageOfReactDto.messageId}/${ReactSocketEmit.CREATE}`,
                react
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
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
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(ReactSocketEvent.DELETE)
    async delete(@MessageBody() reactId: string) {
        try {
            this.reactService.deleteOne({ reactId })

            this.server.emit(`${ReactSocketEmit.DELETE}/${reactId}`, reactId)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }
}
