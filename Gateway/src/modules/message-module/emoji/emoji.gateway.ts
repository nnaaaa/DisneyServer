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
import { GuildDto } from 'src/shared/dtos'
import { GuildPermissionGuard } from 'src/shared/guards/permission.guard'
import { EmojiSocketEmit } from 'src/shared/socket/emit'
import { EmojiSocketEvent } from 'src/shared/socket/event'
import { SocketNamespace } from 'src/shared/socket/namespace'
import { JwtUserWsGuard } from '../../auth-module/auth/guards/jwtWSUser.guard'
import { CreateEmojiDto } from './dtos/createEmoji.dto'
import { UpdateEmojiDto } from './dtos/updateEmoji.dto'
import { EmojiService } from './emoji.service'

@WebSocketGateway({ cors: { origin: '*' }, namespace: SocketNamespace.EMOJI })
export class EmojiGateway {
    private readonly logger = new Logger(EmojiGateway.name)

    @WebSocketServer()
    server: Server

    constructor(private emojiService: EmojiService) {}

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['CREATE_EMOJI'])
    @UseGuards(GuildPermissionGuard)
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

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['UPDATE_EMOJI'])
    @UseGuards(GuildPermissionGuard)
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

    @UseGuards(JwtUserWsGuard)
    @RolePermissions(['DELETE_EMOJI'])
    @UseGuards(GuildPermissionGuard)
    @SubscribeMessage(EmojiSocketEvent.DELETE)
    async delete(@MessageBody('emojiId') emojiId: string) {
        try {
            this.emojiService.deleteOne({ emojiId })

            this.server.emit(`${EmojiSocketEmit.DELETE}/${emojiId}`, emojiId)
        } catch (e) {
            this.logger.error(e)
            throw new WsException(e)
        }
    }
}
