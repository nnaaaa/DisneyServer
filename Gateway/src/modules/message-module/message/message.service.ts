import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MessageEntity } from 'src/entities/message.entity'
import { MessageRepository } from 'src/repositories/message.repository'
import { ChannelDto, MemberDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { ActionService } from '../action/action.service'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'

@Injectable()
export class MessageService {
    public readonly messageRelations: FindOptionsRelations<MessageEntity> = {
        author: true,
        channel: true,
        replies: true,
        replyTo: true,
    }

    constructor(
        @InjectRepository(MessageEntity) private messageRepository: MessageRepository,
        private actionService: ActionService
    ) {}

    async save(message: MessageEntity) {
        return await this.messageRepository.save(message)
    }

    async create(
        createMessageDto: CreateMessageDto,
        channel: ChannelDto,
        author: MemberDto,
        replyTo?: string
    ) {
        const newMessage = this.messageRepository.create({
            images: [],
            ...createMessageDto,
            author,
            channel,
        })
        delete newMessage.action

        if (replyTo) {
            const to = await this.findOneWithRelation({ messageId: replyTo })
            if (to) {
                newMessage.replyTo = to
            }
        }

        return newMessage
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<MessageEntity>) {
        return await this.messageRepository.findOne({
            relations: this.messageRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition: FindOptionsWhere<MessageEntity>) {
        return this.messageRepository.find({
            relations: this.messageRelations,
            where: findCondition,
            order: { createdAt: 'DESC' },
        })
    }
    async findMany(findCondition: FindOptionsWhere<MessageEntity>) {
        return await this.messageRepository.find({
            // relations: this.messageRelations,
            where: findCondition,
        })
    }

    async updateOne(updateMessageDto: UpdateMessageDto) {
        try {
            let message = await this.findOneWithRelation({
                messageId: updateMessageDto.messageId,
            })

            message = Object.assign(message, updateMessageDto)

            return await this.save(message)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<MessageEntity>) {
        try {
            const message = await this.findOneWithRelation(findCondition)
            // if (message) {
            //     const reacts = []
            //     for (const react of message.reacts) {
            //         reacts.push(this.reactService.deleteOne({ reactId: react.reactId }))
            //     }
            //     await Promise.all(reacts)

            //     await this.messageRepository.remove(message)
            // }
            return message
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteMany(findCondition: FindOptionsWhere<MessageEntity>) {
        try {
            const messages = await this.findMany(findCondition)

            const reacts = []
            // for (const message of messages) {
            //     reacts.push(
            //         this.reactService.deleteMany({
            //             message: { messageId: message.messageId },
            //         })
            //     )
            // }
            await Promise.all(reacts)

            await this.messageRepository.remove(messages)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
