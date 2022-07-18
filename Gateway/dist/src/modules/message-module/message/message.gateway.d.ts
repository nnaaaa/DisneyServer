import { Server } from 'socket.io';
import { BotEntity } from 'src/entities/bot.entity';
import { UserEntity } from 'src/entities/user.entity';
import { BotService } from 'src/modules/bot-module/bot/bot.service';
import { GuildService } from 'src/modules/guild-module/guild/guild.service';
import { ChannelDto, MemberDto } from 'src/shared/dtos';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
import { MessageService } from './message.service';
import { ButtonService } from '../button/button.service';
import { ActionService } from '../action/action.service';
export declare class MessageGateway {
    private messageService;
    private guildService;
    private botService;
    private buttonService;
    private actionService;
    private readonly logger;
    server: Server;
    constructor(messageService: MessageService, guildService: GuildService, botService: BotService, buttonService: ButtonService, actionService: ActionService);
    find(botId: string): Promise<any>;
    create(createMessageDto: CreateMessageDto, destinationDto: ChannelDto, authorDto: MemberDto, replyTo: string, userOrBot: BotEntity | UserEntity): Promise<any>;
    update(updateMessageDto: UpdateMessageDto): Promise<any>;
    delete(messageId: string): Promise<any>;
}
