import {
    Inject,
    Injectable,
    InternalServerErrorException,
    OnModuleInit,
} from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { ChannelEntity } from 'src/entities/channel.entity'
import { MesssageEntity } from 'src/entities/message.entity'
import { UserEntity } from 'src/entities/user.entity'
import { MessageRepository } from 'src/repositories/message.repository'
import { MessagePatternEvent } from 'src/shared/event.pattern'
import { ServiceName } from 'src/shared/services'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'

@Injectable()
export class MessageService implements OnModuleInit {
    public readonly messageRelations: FindOptionsRelations<MesssageEntity> = {
        author: true,
        channel: true,
    }

    constructor(
        @Inject(ServiceName.MESSAGE) private messageClient: ClientKafka,
        @InjectRepository(MesssageEntity) private messageRepository: MessageRepository
    ) {}

    // create(createMessageDto: CreateMessageDto, author: UserEntity) {
    //     return this.messageClient.send(MessagePatternEvent.CREATE, { ...createMessageDto,userId:author.userId })
    // }

    // updateOne(updateMessageDto: UpdateMessageDto) {
    //     return this.messageClient.send(MessagePatternEvent.UPDATE, updateMessageDto)
    // }

    // deleteOne(messageId: string) {
    //     this.messageClient.emit(MessagePatternEvent.DELETE, messageId)
    // }

    async save(message: MesssageEntity) {
        return await this.messageRepository.save(message)
        // this.messageClient.emit(MessagePatternEvent.CREATE, message)
    }

    create(
        createMessageDto: CreateMessageDto,
        channel: ChannelEntity,
        author: UserEntity
    ) {
        const newMessage = this.messageRepository.create({
            images: [],
            ...createMessageDto,
            author,
            channel,
        })

        return newMessage
        // return this.messageClient.send(MessagePatternEvent.CREATE, { ...createMessageDto, userId: author.userId })
    }

    async findOne(findCondition: FindOptionsWhere<MesssageEntity>) {
        return await this.messageRepository.findOne({
            relations: this.messageRelations,
            where: findCondition,
        })
    }

    async updateOne(updateMessageDto: UpdateMessageDto) {
        try {
            let message = await this.findOne({ messageId: updateMessageDto.messageId })

            message = Object.assign(message, updateMessageDto)

            return await this.save(message)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
        // return this.messageClient.send(MessagePatternEvent.UPDATE, updateMessageDto)
    }

    async deleteOne(findCondition: FindOptionsWhere<MesssageEntity>) {
        try {
            await this.messageRepository.delete(findCondition)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
        // this.messageClient.emit(MessagePatternEvent.DELETE, messageId)
    }

    onModuleInit() {
        this.messageClient.subscribeToResponseOf(MessagePatternEvent.CREATE)
        this.messageClient.subscribeToResponseOf(MessagePatternEvent.UPDATE)
    }
}
