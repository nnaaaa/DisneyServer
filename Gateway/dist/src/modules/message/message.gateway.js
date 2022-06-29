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
var MessageGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_user_decorator_1 = require("../../decorators/auth-user.decorator");
const user_entity_1 = require("../../entities/user.entity");
const socket_event_1 = require("../../shared/socket.event");
const jwtWS_guard_1 = require("../auth/guards/jwtWS.guard");
const channel_service_1 = require("../channel/channel.service");
const createMessage_dto_1 = require("./dtos/createMessage.dto");
const updateMessage_dto_1 = require("./dtos/updateMessage.dto");
const message_service_1 = require("./message.service");
let MessageGateway = MessageGateway_1 = class MessageGateway {
    constructor(messageService, channelService) {
        this.messageService = messageService;
        this.channelService = channelService;
        this.logger = new common_1.Logger(MessageGateway_1.name);
    }
    async create(authUser, createMessageDto, channelId) {
        try {
            const channel = await this.channelService.findOne({ channelId });
            const newMessage = this.messageService.create(createMessageDto, channel, authUser);
            const savedMessage = await this.messageService.save(newMessage);
            this.server.emit(`${channelId}/${socket_event_1.MessageSocketEvent.CREATE}`, savedMessage);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async update(updateMessageDto) {
        try {
            this.messageService.updateOne(updateMessageDto);
            this.server.emit(`${socket_event_1.MessageSocketEvent.UPDATE}/${updateMessageDto.messageId}`, updateMessageDto);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async delete(messageId) {
        try {
            this.messageService.deleteOne({ messageId });
            this.server.emit(`${socket_event_1.MessageSocketEvent.DELETE}/${messageId}`, messageId);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_1.MessageSocketEvent.CREATE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, auth_user_decorator_1.AuthWSUser)()),
    __param(1, (0, websockets_1.MessageBody)('message')),
    __param(2, (0, websockets_1.MessageBody)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        createMessage_dto_1.CreateMessageDto, String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_1.MessageSocketEvent.UPDATE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateMessage_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(socket_event_1.MessageSocketEvent.DELETE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "delete", null);
MessageGateway = MessageGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'message' }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        channel_service_1.ChannelService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map