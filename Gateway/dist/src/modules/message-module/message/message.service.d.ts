import { MessageEntity } from 'src/entities/message.entity'
import { MessageRepository } from 'src/repositories/message.repository'
import { ChannelDto, MemberDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { ActionService } from '../action/action.service'
import { ButtonService } from '../button/button.service'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'
export declare class MessageService {
    private messageRepository
    private actionService
    private buttonService
    readonly messageRelations: FindOptionsRelations<MessageEntity>
    constructor(
        messageRepository: MessageRepository,
        actionService: ActionService,
        buttonService: ButtonService
    )
    save(message: MessageEntity): Promise<MessageEntity>
    create(
        createMessageDto: CreateMessageDto,
        channel: ChannelDto,
        author: MemberDto,
        replyTo?: string
    ): Promise<MessageEntity>
    updateOne(updateMessageDto: UpdateMessageDto): Promise<MessageEntity>
    findOneWithRelation(
        findCondition: FindOptionsWhere<MessageEntity>
    ): Promise<MessageEntity>
    findManyWithRelation(
        findCondition: FindOptionsWhere<MessageEntity>
    ): Promise<MessageEntity[]>
    findMany(findCondition: FindOptionsWhere<MessageEntity>): Promise<MessageEntity[]>
    deleteOne(findCondition: FindOptionsWhere<MessageEntity>): Promise<MessageEntity>
    deleteMany(findCondition: FindOptionsWhere<MessageEntity>): Promise<void>
}
