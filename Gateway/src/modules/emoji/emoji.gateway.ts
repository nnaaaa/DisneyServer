import { Logger, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import { Server } from 'socket.io'
import { GuildDto } from 'src/shared/dtos'
import { EmojiSocketEmit } from 'src/shared/socket/emit'
import { EmojiSocketEvent } from 'src/shared/socket/event'
import { JwtWsGuard } from '../auth/guards/jwtWS.guard'
import { CreateEmojiDto } from './dtos/createEmoji.dto'
import { UpdateEmojiDto } from './dtos/updateEmoji.dto'
import { EmojiService } from './emoji.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'emoji' })
export class EmojiGateway {
    private readonly logger = new Logger(EmojiGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private emojiService: EmojiService) {}

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(EmojiSocketEvent.CREATE)
    @UsePipes(new ValidationPipe())
    async create(
        @MessageBody('emoji') createEmojiDto: CreateEmojiDto,
        @MessageBody('guild') guildOfEmoji: GuildDto
    ) {
        try {
            const newEmoji = this.emojiService.create(createEmojiDto, guildOfEmoji)

            const savedEmoji = await this.emojiService.save(newEmoji)

            this.server.emit(
                `${guildOfEmoji.guildId}/${EmojiSocketEmit.CREATE}`,
                savedEmoji
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(EmojiSocketEvent.UPDATE)
    @UsePipes(new ValidationPipe())
    async update(@MessageBody() updateEmojiDto: UpdateEmojiDto) {
        try {
            this.emojiService.updateOne(updateEmojiDto)

            this.server.emit(
                `${EmojiSocketEmit.UPDATE}/${updateEmojiDto.emojiId}`,
                updateEmojiDto
            )
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }

    @UseGuards(JwtWsGuard)
    @SubscribeMessage(EmojiSocketEvent.DELETE)
    async delete(@MessageBody() emojiId: string) {
        try {
            this.emojiService.deleteOne({ emojiId })

            this.server.emit(`${EmojiSocketEmit.DELETE}/${emojiId}`, emojiId)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }
}
