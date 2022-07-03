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
var RoleGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const role_permission_decorator_1 = require("../../../shared/decorators/role-permission.decorator");
const dtos_1 = require("../../../shared/dtos");
const permission_guard_1 = require("../../../shared/guards/permission.guard");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const jwtWS_guard_1 = require("../../auth-module/auth/guards/jwtWS.guard");
const channelRole_dto_1 = require("./dtos/channelRole.dto");
const createRole_dto_1 = require("./dtos/createRole.dto");
const memberRole_dto_1 = require("./dtos/memberRole.dto");
const updateRole_dto_1 = require("./dtos/updateRole.dto");
const role_service_1 = require("./role.service");
let RoleGateway = RoleGateway_1 = class RoleGateway {
    constructor(roleService) {
        this.roleService = roleService;
        this.logger = new common_1.Logger(RoleGateway_1.name);
    }
    async create(createDto, guild) {
        try {
            const role = await this.roleService.create(createDto, guild);
            const savedRole = await this.roleService.save(role);
            this.server.emit(`${guild.guildId}/${emit_1.RoleSocketEmit.CREATE}`, savedRole);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async update(updateRoleDto) {
        try {
            const { roleId } = updateRoleDto;
            await this.roleService.update({ roleId }, updateRoleDto);
            this.server.emit(`${emit_1.RoleSocketEmit.UPDATE}/${roleId}`, updateRoleDto);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async delete(roleId) {
        try {
            await this.roleService.deleteOne({ roleId });
            this.server.emit(`${emit_1.RoleSocketEmit.DELETE}/${roleId}`);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async addToMember(memberRoleDto) {
        try {
            const { member, role } = await this.roleService.addToMember(memberRoleDto);
            this.server.emit(`${emit_1.RoleSocketEmit.ADD_TO_MEMBER}/${role.roleId}`, { member, role });
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async removeFromMember(memberRoleDto) {
        try {
            const { member, role } = await this.roleService.removeFromMember(memberRoleDto);
            this.server.emit(`${emit_1.RoleSocketEmit.REMOVE_FROM_MEMBER}/${role.roleId}`, { member, role });
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async addToChannel(channelRoleDto) {
        try {
            const { role, channel } = await this.roleService.addToChannel(channelRoleDto);
            this.server.emit(`${emit_1.RoleSocketEmit.ADD_TO_CHANNEL}/${role.roleId}`, { channel, role });
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async removeFromChannel(channelRoleDto) {
        try {
            const { role, channel } = await this.roleService.removeFromChannel(channelRoleDto);
            this.server.emit(`${emit_1.RoleSocketEmit.REMOVE_FROM_CHANNEL}/${role.roleId}`, { channel, role });
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
], RoleGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['CREATE_ROLE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.SubscribeMessage)(event_1.RoleSocketEvent.CREATE),
    __param(0, (0, websockets_1.MessageBody)('role')),
    __param(1, (0, websockets_1.MessageBody)('guild')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRole_dto_1.CreateRoleDto,
        dtos_1.GuildDto]),
    __metadata("design:returntype", Promise)
], RoleGateway.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_ROLE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.SubscribeMessage)(event_1.RoleSocketEvent.UPDATE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateRole_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleGateway.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['DELETE_ROLE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.RoleSocketEvent.DELETE),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleGateway.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_ROLE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.SubscribeMessage)(event_1.RoleSocketEvent.ADD_TO_MEMBER),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memberRole_dto_1.MemberRoleDto]),
    __metadata("design:returntype", Promise)
], RoleGateway.prototype, "addToMember", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_ROLE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.RoleSocketEvent.REMOVE_FROM_MEMBER),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [memberRole_dto_1.MemberRoleDto]),
    __metadata("design:returntype", Promise)
], RoleGateway.prototype, "removeFromMember", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_ROLE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.SubscribeMessage)(event_1.RoleSocketEvent.ADD_TO_CHANNEL),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelRole_dto_1.ChannelRoleDto]),
    __metadata("design:returntype", Promise)
], RoleGateway.prototype, "addToChannel", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['UPDATE_ROLE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.RoleSocketEvent.REMOVE_FROM_CHANNEL),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channelRole_dto_1.ChannelRoleDto]),
    __metadata("design:returntype", Promise)
], RoleGateway.prototype, "removeFromChannel", null);
RoleGateway = RoleGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'role' }),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleGateway);
exports.RoleGateway = RoleGateway;
//# sourceMappingURL=role.gateway.js.map