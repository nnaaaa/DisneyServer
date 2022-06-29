"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("../../entities/message.entity");
const message_repository_1 = require("../../repositories/message.repository");
const event_pattern_1 = require("../../shared/event.pattern");
const services_1 = require("../../shared/services");
let MessageService = class MessageService {
    constructor(messageClient, messageRepository) {
        this.messageClient = messageClient;
        this.messageRepository = messageRepository;
        this.messageRelations = {
            author: true,
            channel: true,
        };
    }
    async save(message) {
        return await this.messageRepository.save(message);
    }
    create(createMessageDto, channel, author) {
        const newMessage = this.messageRepository.create(Object.assign(Object.assign({ images: [] }, createMessageDto), { author,
            channel }));
        return newMessage;
    }
    async findOne(findCondition) {
        return await this.messageRepository.findOne({
            relations: this.messageRelations,
            where: findCondition,
        });
    }
    async updateOne(updateMessageDto) {
        try {
            let message = await this.findOne({ messageId: updateMessageDto.messageId });
            message = Object.assign(message, updateMessageDto);
            return await this.save(message);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteOne(findCondition) {
        try {
            await this.messageRepository.delete(findCondition);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    onModuleInit() {
        this.messageClient.subscribeToResponseOf(event_pattern_1.MessagePatternEvent.CREATE);
        this.messageClient.subscribeToResponseOf(event_pattern_1.MessagePatternEvent.UPDATE);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.ServiceName.MESSAGE)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.MesssageEntity)),
    __metadata("design:paramtypes", [microservices_1.ClientKafka,
        message_repository_1.MessageRepository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map