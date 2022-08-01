import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MessageEntity } from 'src/entities/message.entity'
import { MessageRepository } from 'src/repositories/message.repository'
import { ChannelDto, MemberDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { ActionService } from '../action/action.service'
import { ButtonService } from '../button/button.service'
import { ReactService } from '../react/react.service'
import { SelectService } from '../select/select.service'
import { CreateMessageDto } from './dtos/createMessage.dto'
import { UpdateMessageDto } from './dtos/updateMessage.dto'

@Injectable()
export class MessageService {
    public readonly messageRelations: FindOptionsRelations<MessageEntity> = {
        author: true,
        channel: true,
        action: {
            buttons: true,
            reacts: {
                author: true,
                emoji: true,
                action: true,
            },
            selects: {
                options: true,
                action: true,
            },
        },
        replies: true,
        replyTo: true,
    }

    constructor(
        @InjectRepository(MessageEntity) private messageRepository: MessageRepository,
        private actionService: ActionService,
        private buttonService: ButtonService,
        private reactService: ReactService,
        private selectService: SelectService
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

        const createdAction = await this.actionService.create({})
        const savedAction = await this.actionService.save(createdAction)

        if (createMessageDto.action) {
            for (const button of createMessageDto.action.buttons) {
                const createdButton = await this.buttonService.create(button, savedAction)
                savedAction.buttons.push(createdButton)
            }
            for (const react of createMessageDto.action.reacts) {
                const createdReact = await this.reactService.create({
                    ...react,
                    action: savedAction,
                    author,
                })
                savedAction.reacts.push(createdReact)
            }
            for (const select of createMessageDto.action.selects) {
                const createdSelect = await this.selectService.create(select, savedAction)
                savedAction.selects.push(createdSelect)
            }
        }
        newMessage.action = savedAction
        await this.actionService.save(savedAction)

        if (replyTo) {
            const to = await this.findOneWithRelation({ messageId: replyTo })
            if (to) {
                newMessage.replyTo = to
            }
        }

        return newMessage
    }

    async updateOne(updateMessageDto: UpdateMessageDto) {
        try {
            const message = await this.findOneWithRelation({
                messageId: updateMessageDto.messageId,
            })
            if (message) {
                if (updateMessageDto.action) {
                    //xóa button cũ
                    this.buttonService.deleteMany({
                        action: { actionId: message.action.actionId },
                    })

                    message.action.buttons = []
                    for (const button of updateMessageDto.action.buttons) {
                        const createdButton = await this.buttonService.create(
                            button,
                            message.action
                        )
                        message.action.buttons.push(createdButton)
                    }
                    this.actionService.save(message.action)

                    delete updateMessageDto.action
                }
                return await this.save(
                    this.messageRepository.merge(message, updateMessageDto)
                )
            }
            return null
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
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

    async deleteOne(findCondition: FindOptionsWhere<MessageEntity>) {
        try {
            const message = await this.findOneWithRelation(findCondition)

            if (message) {
                await this.actionService.deleteOne({
                    message: { messageId: message.messageId },
                })
            }
            return message
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteMany(findCondition: FindOptionsWhere<MessageEntity>) {
        try {
            const messages = await this.findMany(findCondition)

            const actions = []
            for (const message of messages) {
                actions.push(
                    this.actionService.deleteOne({
                        message: { messageId: message.messageId },
                    })
                )
            }
            await Promise.all(actions)

            await this.messageRepository.remove(messages)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
