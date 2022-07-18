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
const jwtWS_guard_1 = require("../../auth-module/auth/guards/jwtWS.guard");
const bot_service_1 = require("../../bot-module/bot/bot.service");
const guild_service_1 = require("../../guild-module/guild/guild.service");
const algorithms_1 = require("../../../shared/utils/algorithms");
const auth_user_decorator_1 = require("../../../shared/decorators/auth-user.decorator");
const role_permission_decorator_1 = require("../../../shared/decorators/role-permission.decorator");
const dtos_1 = require("../../../shared/dtos");
const permission_guard_1 = require("../../../shared/guards/permission.guard");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const namespace_1 = require("../../../shared/socket/namespace");
const typeorm_1 = require("typeorm");
const jwtWSUser_guard_1 = require("../../auth-module/auth/guards/jwtWSUser.guard");
const createMessage_dto_1 = require("./dtos/createMessage.dto");
const updateMessage_dto_1 = require("./dtos/updateMessage.dto");
const message_service_1 = require("./message.service");
const button_service_1 = require("../button/button.service");
const action_service_1 = require("../action/action.service");
let MessageGateway = MessageGateway_1 = class MessageGateway {
    constructor(messageService, guildService, botService, buttonService, actionService) {
        this.messageService = messageService;
        this.guildService = guildService;
        this.botService = botService;
        this.buttonService = buttonService;
        this.actionService = actionService;
        this.logger = new common_1.Logger(MessageGateway_1.name);
    }
    async find(botId) {
        try {
            const bot = await this.botService.findOneWithRelation({ botId });
            const messages = await this.messageService.findManyWithRelation({
                author: { memberId: (0, typeorm_1.In)(bot.joinedGuilds.map((guild) => guild.memberId)) },
            });
            return messages;
        }
        catch (e) {
            this.logger.error(e);
            return e;
        }
    }
    async create(createMessageDto, destinationDto, authorDto, replyTo, userOrBot) {
        try {
            const newMessage = await this.messageService.create(createMessageDto, destinationDto, authorDto, replyTo);
            const createdAction = await this.actionService.create({});
            const savedAction = await this.actionService.save(createdAction);
            for (const button of createMessageDto.action.buttons) {
                const createdButton = await this.buttonService.create(button, savedAction);
                savedAction.buttons.push(createdButton);
            }
            newMessage.action = savedAction;
            const savedMessage = await this.messageService.save(newMessage);
            const [message, guild] = await Promise.all([
                this.messageService.findOneWithRelation({
                    messageId: savedMessage.messageId,
                }),
                this.guildService.findByMessage(savedMessage),
            ]);
            const botList = await this.botService.findByGuild(guild);
            this.server.emit(`${destinationDto.channelId}/${emit_1.MessageSocketEmit.CREATE}`, message);
            const inspected = algorithms_1.Algorithm.inspectCommand(message.content);
            if (inspected) {
                botList.forEach((bot) => {
                    const { botName, args, name } = inspected;
                    const isMatchCommand = bot.commands.some((command) => command.name === name && command.args.length === args.length);
                    if (botName && botName === bot.name && isMatchCommand) {
                        this.server.emit(`${bot.botId}/${namespace_1.SocketNamespace.MESSAGE}/${emit_1.MessageSocketEmit.CREATE}`, message, inspected, guild);
                    }
                });
            }
            this.server.emit(`botManager/${userOrBot === null || userOrBot === void 0 ? void 0 : userOrBot.botId}/${namespace_1.SocketNamespace.MESSAGE}/${emit_1.MessageSocketEmit.CREATE}`, savedMessage);
        }
        catch (e) {
            this.logger.error(e);
            return e;
        }
    }
    async update(updateMessageDto) {
        try {
            this.messageService.updateOne(updateMessageDto);
            this.server.emit(`${emit_1.MessageSocketEmit.UPDATE}/${updateMessageDto.messageId}`, updateMessageDto);
        }
        catch (e) {
            this.logger.error(e);
            return e;
        }
    }
    async delete(messageId) {
        try {
            this.messageService.deleteOne({ messageId });
            this.server.emit(`${emit_1.MessageSocketEmit.DELETE}/${messageId}`, messageId);
        }
        catch (e) {
            this.logger.error(e);
            return e;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.SubscribeMessage)(event_1.MessageSocketEvent.FIND),
    __param(0, (0, websockets_1.MessageBody)('botId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "find", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['CREATE_MESSAGE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.MessageSocketEvent.CREATE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)('message')),
    __param(1, (0, websockets_1.MessageBody)('channel')),
    __param(2, (0, websockets_1.MessageBody)('member')),
    __param(3, (0, websockets_1.MessageBody)('replyTo')),
    __param(4, (0, auth_user_decorator_1.AuthWSUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMessage_dto_1.CreateMessageDto,
        dtos_1.ChannelDto,
        dtos_1.MemberDto, String, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
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
    (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['DELETE_MESSAGE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.MessageSocketEvent.DELETE),
    __param(0, (0, websockets_1.MessageBody)('messageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "delete", null);
MessageGateway = MessageGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: namespace_1.SocketNamespace.MESSAGE }),
    __param(1, (0, common_1.Inject)(guild_service_1.GuildService)),
    __param(2, (0, common_1.Inject)(bot_service_1.BotService)),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        guild_service_1.GuildService,
        bot_service_1.BotService,
        button_service_1.ButtonService,
        action_service_1.ActionService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map