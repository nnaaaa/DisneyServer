'use strict'
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r =
                c < 3
                    ? target
                    : desc === null
                    ? (desc = Object.getOwnPropertyDescriptor(target, key))
                    : desc,
            d
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc)
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
        return c > 3 && r && Object.defineProperty(target, key, r), r
    }
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(k, v)
    }
var __param =
    (this && this.__param) ||
    function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex)
        }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.MessageService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const message_entity_1 = require('../../../entities/message.entity')
const message_repository_1 = require('../../../repositories/message.repository')
const action_service_1 = require('../action/action.service')
const button_service_1 = require('../button/button.service')
let MessageService = class MessageService {
    constructor(messageRepository, actionService, buttonService) {
        this.messageRepository = messageRepository
        this.actionService = actionService
        this.buttonService = buttonService
        this.messageRelations = {
            author: true,
            channel: true,
            action: {
                buttons: true,
                reacts: true,
            },
            replies: true,
            replyTo: true,
        }
    }
    async save(message) {
        return await this.messageRepository.save(message)
    }
    async create(createMessageDto, channel, author, replyTo) {
        const newMessage = this.messageRepository.create(
            Object.assign(Object.assign({ images: [] }, createMessageDto), {
                author,
                channel,
            })
        )
        const createdAction = await this.actionService.create({})
        const savedAction = await this.actionService.save(createdAction)
        if (createMessageDto.action) {
            for (const button of createMessageDto.action.buttons) {
                const createdButton = await this.buttonService.create(button, savedAction)
                savedAction.buttons.push(createdButton)
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
    async updateOne(updateMessageDto) {
        try {
            const message = await this.findOneWithRelation({
                messageId: updateMessageDto.messageId,
            })
            if (message) {
                if (updateMessageDto.action) {
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
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async findOneWithRelation(findCondition) {
        return await this.messageRepository.findOne({
            relations: this.messageRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition) {
        return this.messageRepository.find({
            relations: this.messageRelations,
            where: findCondition,
            order: { createdAt: 'DESC' },
        })
    }
    async findMany(findCondition) {
        return await this.messageRepository.find({
            where: findCondition,
        })
    }
    async deleteOne(findCondition) {
        try {
            const message = await this.findOneWithRelation(findCondition)
            return message
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteMany(findCondition) {
        try {
            const messages = await this.findMany(findCondition)
            const reacts = []
            await Promise.all(reacts)
            await this.messageRepository.remove(messages)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
}
MessageService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
        __metadata('design:paramtypes', [
            message_repository_1.MessageRepository,
            action_service_1.ActionService,
            button_service_1.ButtonService,
        ]),
    ],
    MessageService
)
exports.MessageService = MessageService
//# sourceMappingURL=message.service.js.map
