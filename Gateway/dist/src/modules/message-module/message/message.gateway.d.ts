import { Server } from 'socket.io'
import { BotService } from 'src/modules/bot-module/bot/bot.service'
import { GuildService } from 'src/modules/guild-module/guild/guild.service'
import { ChannelDto, MemberDto } from 'src/shared/dtos'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'
import { MessageService } from './message.service'
export declare class MessageGateway {
    private messageService
    private guildService
    private botService
    private readonly logger
    server: Server
    constructor(
        messageService: MessageService,
        guildService: GuildService,
        botService: BotService
    )
    create(
        createMessageDto: CreateMessageDto,
        destinationDto: ChannelDto,
        authorDto: MemberDto,
        replyTo: string
    ): Promise<void>
    update(updateMessageDto: UpdateMessageDto): Promise<void>
    delete(messageId: string): Promise<void>
}
