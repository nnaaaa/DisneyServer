import { Server } from 'socket.io';
import { ChannelDto, MemberDto } from 'src/shared/dtos';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
import { MessageService } from './message.service';
export declare class MessageGateway {
    private messageService;
    private readonly logger;
    server: Server;
    constructor(messageService: MessageService);
    create(createMessageDto: CreateMessageDto, destinationDto: ChannelDto, authorDto: MemberDto): Promise<void>;
    update(updateMessageDto: UpdateMessageDto): Promise<void>;
    delete(messageId: string): Promise<void>;
}
