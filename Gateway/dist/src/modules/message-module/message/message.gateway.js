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
const role_permission_decorator_1 = require("../../../shared/decorators/role-permission.decorator");
const dtos_1 = require("../../../shared/dtos");
const permission_guard_1 = require("../../../shared/guards/permission.guard");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const jwtWS_guard_1 = require("../../auth-module/auth/guards/jwtWS.guard");
const createMessage_dto_1 = require("./dtos/createMessage.dto");
const updateMessage_dto_1 = require("./dtos/updateMessage.dto");
const message_service_1 = require("./message.service");
let MessageGateway = MessageGateway_1 = class MessageGateway {
    constructor(messageService) {
        this.messageService = messageService;
        this.logger = new common_1.Logger(MessageGateway_1.name);
    }
    async create(createMessageDto, destinationDto, authorDto) {
        try {
            const newMessage = this.messageService.create(createMessageDto, destinationDto, authorDto);
            const savedMessage = await this.messageService.save(newMessage);
            this.server.emit(`${destinationDto.channelId}/${emit_1.MessageSocketEmit.CREATE}`, savedMessage);
            this.server.emit(`${emit_1.MessageSocketEmit.CREATE}`, savedMessage);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async update(updateMessageDto) {
        try {
            this.messageService.updateOne(updateMessageDto);
            this.server.emit(`${emit_1.MessageSocketEmit.UPDATE}/${updateMessageDto.messageId}`, updateMessageDto);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async delete(messageId) {
        try {
            this.messageService.deleteOne({ messageId });
            this.server.emit(`${emit_1.MessageSocketEmit.DELETE}/${messageId}`, messageId);
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
    (0, role_permission_decorator_1.RolePermissions)(['CREATE_MESSAGE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.MessageSocketEvent.CREATE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)('message')),
    __param(1, (0, websockets_1.MessageBody)('channel')),
    __param(2, (0, websockets_1.MessageBody)('member')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMessage_dto_1.CreateMessageDto,
        dtos_1.ChannelDto,
        dtos_1.MemberDto]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_MESSAGE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.MessageSocketEvent.UPDATE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateMessage_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['DELETE_MESSAGE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.MessageSocketEvent.DELETE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "delete", null);
MessageGateway = MessageGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'message' }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map