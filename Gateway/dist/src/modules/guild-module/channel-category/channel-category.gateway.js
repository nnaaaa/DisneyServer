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
var ChannelCategoryGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelCategoryGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const role_permission_decorator_1 = require("../../../shared/decorators/role-permission.decorator");
const dtos_1 = require("../../../shared/dtos");
const permission_guard_1 = require("../../../shared/guards/permission.guard");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const jwtWS_guard_1 = require("../../auth-module/auth/guards/jwtWS.guard");
const channel_category_service_1 = require("./channel-category.service");
const createChannelCtg_dto_1 = require("./dtos/createChannelCtg.dto");
const updateChannelCtg_dto_1 = require("./dtos/updateChannelCtg.dto");
let ChannelCategoryGateway = ChannelCategoryGateway_1 = class ChannelCategoryGateway {
    constructor(channelCtgService) {
        this.channelCtgService = channelCtgService;
        this.logger = new common_1.Logger(ChannelCategoryGateway_1.name);
    }
    async create(createChannelCtgDto, guild) {
        try {
            const channelCategory = await this.channelCtgService.create(createChannelCtgDto, guild);
            const savedChannelCategory = await this.channelCtgService.save(channelCategory);
            this.server.emit(`${guild.guildId}/${emit_1.ChannelCtgSocketEmit.CREATE}`, savedChannelCategory);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async update(updateChannelCtgDto) {
        try {
            await this.channelCtgService.updateOne({ categoryId: updateChannelCtgDto.categoryId }, updateChannelCtgDto);
            this.server.emit(`${emit_1.ChannelCtgSocketEmit.UPDATE}/${updateChannelCtgDto.categoryId}`, updateChannelCtgDto);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async delete(categoryId) {
        try {
            await this.channelCtgService.deleteOne({ categoryId });
            this.server.emit(`${emit_1.ChannelCtgSocketEmit.DELETE}/${categoryId}`);
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
], ChannelCategoryGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelCtgSocketEvent.CREATE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['CREATE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)('category')),
    __param(1, (0, websockets_1.MessageBody)('guild')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createChannelCtg_dto_1.CreateChannelCtgDto,
        dtos_1.GuildDto]),
    __metadata("design:returntype", Promise)
], ChannelCategoryGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelCtgSocketEvent.UPDATE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateChannelCtg_dto_1.UpdateChannelCtgDto]),
    __metadata("design:returntype", Promise)
], ChannelCategoryGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_1.ChannelCtgSocketEvent.DELETE),
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['DELETE_CHANNEL']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelCategoryGateway.prototype, "delete", null);
ChannelCategoryGateway = ChannelCategoryGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'channel-category' }),
    __metadata("design:paramtypes", [channel_category_service_1.ChannelCategoryService])
], ChannelCategoryGateway);
exports.ChannelCategoryGateway = ChannelCategoryGateway;
//# sourceMappingURL=channel-category.gateway.js.map