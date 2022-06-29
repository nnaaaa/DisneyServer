import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ChannelEntity } from 'src/entities/channel.entity';
import { MesssageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.entity';
import { MessageRepository } from 'src/repositories/message.repository';
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { CreateMessageDto } from './dtos/createMessage.dto';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
export declare class MessageService implements OnModuleInit {
    private messageClient;
    private messageRepository;
    readonly messageRelations: FindOptionsRelations<MesssageEntity>;
    constructor(messageClient: ClientKafka, messageRepository: MessageRepository);
    save(message: MesssageEntity): Promise<MesssageEntity>;
    create(createMessageDto: CreateMessageDto, channel: ChannelEntity, author: UserEntity): MesssageEntity;
    findOne(findCondition: FindOptionsWhere<MesssageEntity>): Promise<MesssageEntity>;
    updateOne(updateMessageDto: UpdateMessageDto): Promise<MesssageEntity>;
    deleteOne(findCondition: FindOptionsWhere<MesssageEntity>): Promise<void>;
    onModuleInit(): void;
}
