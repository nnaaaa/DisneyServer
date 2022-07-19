import { Server } from 'socket.io'
import { GuildDto } from 'src/shared/dtos'
import { CreateEmojiDto } from './dtos/createEmoji.dto'
import { UpdateEmojiDto } from './dtos/updateEmoji.dto'
import { EmojiService } from './emoji.service'
export declare class EmojiGateway {
    private emojiService
    private readonly logger
    server: Server
    constructor(emojiService: EmojiService)
    create(createEmojiDto: CreateEmojiDto, guildOfEmoji: GuildDto): Promise<any>
    update(updateEmojiDto: UpdateEmojiDto): Promise<any>
    delete(emojiId: string): Promise<any>
}
