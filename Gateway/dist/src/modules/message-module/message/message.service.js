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
const react_service_1 = require('../react/react.service')
let MessageService = class MessageService {
    constructor(messageRepository, reactService) {
        this.messageRepository = messageRepository
        this.reactService = reactService
        this.messageRelations = {
            author: true,
            channel: true,
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
        if (replyTo) {
            const to = await this.findOneWithRelation({ messageId: replyTo })
            if (to) {
                newMessage.replyTo = to
            }
        }
        return newMessage
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
    async updateOne(updateMessageDto) {
        try {
            let message = await this.findOneWithRelation({
                messageId: updateMessageDto.messageId,
            })
            message = Object.assign(message, updateMessageDto)
            return await this.save(message)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteOne(findCondition) {
        try {
            const message = await this.findOneWithRelation(findCondition)
            if (message) {
                const reacts = []
                for (const react of message.reacts) {
                    reacts.push(this.reactService.deleteOne({ reactId: react.reactId }))
                }
                await Promise.all(reacts)
                await this.messageRepository.remove(message)
            }
            return message
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteMany(findCondition) {
        try {
            const messages = await this.findMany(findCondition)
            const reacts = []
            for (const message of messages) {
                reacts.push(
                    this.reactService.deleteMany({
                        message: { messageId: message.messageId },
                    })
                )
            }
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
            react_service_1.ReactService,
        ]),
    ],
    MessageService
)
exports.MessageService = MessageService
//# sourceMappingURL=message.service.js.map
