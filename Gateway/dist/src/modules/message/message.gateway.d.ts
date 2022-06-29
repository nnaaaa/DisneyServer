import { Server } from 'socket.io';
import { UserEntity } from 'src/entities/user.entity';
import { ChannelService } from '../channel/channel.service';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
import { MessageService } from './message.service';
export declare class MessageGateway {
    private messageService;
    private channelService;
    private readonly logger;
    server: Server;
    constructor(messageService: MessageService, channelService: ChannelService);
    create(authUser: UserEntity, createMessageDto: CreateMessageDto, channelId: string): Promise<void>;
    update(updateMessageDto: UpdateMessageDto): Promise<void>;
    delete(messageId: string): Promise<void>;
}
