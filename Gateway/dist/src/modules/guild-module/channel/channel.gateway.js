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
var ChannelGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const dtos_1 = require("../../../shared/dtos");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const jwtWS_guard_1 = require("../../auth-module/auth/guards/jwtWS.guard");
const channel_category_dto_1 = require("../../../shared/dtos/channel-category.dto");
const channel_service_1 = require("./channel.service");
const createChannel_dto_1 = require("./dtos/createChannel.dto");
const memberChannel_dto_1 = require("./dtos/memberChannel.dto");
const updateChannel_dto_1 = require("./dtos/updateChannel.dto");
const permission_guard_1 = require("../../../shared/guards/permission.guard");
const role_permission_decorator_1 = require("../../../shared/decorators/role-permission.decorator");
let ChannelGateway = ChannelGateway_1 = class ChannelGateway {
    constructor(channelService) {
        this.channelService = channelService;
        this.logger = new common_1.Logger(ChannelGateway_1.name);
    }
    async create(createChannelDto, categoryDto, firstMemberDto) {
        try {
            const channel = await this.channelService.create(createChannelDto, categoryDto);
            channel.members.push(firstMemberDto);
            const savedChannel = await this.channelService.save(channel);
            this.server.emit(`${categoryDto.categoryId}/${emit_1.ChannelSocketEmit.CREATE}`, savedChannel);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async update(updateChannelDto) {
        try {
            const channel = await this.channelService.updateOne({ channelId: updateChannelDto.channelId }, updateChannelDto);
            this.server.emit(`${emit_1.ChannelSocketEmit.UPDATE}/${updateChannelDto.channelId}`, channel);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async delete(channelId) {
        try {
            await this.channelService.deleteOne({ channelId });
            this.server.emit(`${emit_1.ChannelSocketEmit.DELETE}/${channelId}`);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async addMember(memberChannelDto) {
        try {
            const { channel, member } = await this.channelService.addMember(memberChannelDto);
            this.server.emit(`${emit_1.ChannelSocketEmit.ADD_MEMBER}/${channel.channelId}`, { channel, member });
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async removeMember(memberChannelDto) {
        try {
            const { channel, member } = await this.channelService.removeMember(memberChannelDto);
            this.server.emit(`${emit_1.ChannelSocketEmit.REMOVE_MEMBER}/${channel.channelId}`, { channel, member });
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
], ChannelGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelSocketEvent.CREATE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['CREATE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)('channel')),
    __param(1, (0, websockets_1.MessageBody)('category')),
    __param(2, (0, websockets_1.MessageBody)('firstMember')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createChannel_dto_1.CreateChannelDto,
        channel_category_dto_1.ChannelCategoryDto,
        dtos_1.MemberDto]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelSocketEvent.UPDATE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateChannel_dto_1.UpdateChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelSocketEvent.DELETE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['DELETE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "delete", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelSocketEvent.ADD_MEMBER),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memberChannel_dto_1.MemberChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "addMember", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelSocketEvent.REMOVE_MEMBER),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memberChannel_dto_1.MemberChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelGateway.prototype, "removeMember", null);
ChannelGateway = ChannelGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'channel' }),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelGateway);
exports.ChannelGateway = ChannelGateway;
//# sourceMappingURL=channel.gateway.js.map