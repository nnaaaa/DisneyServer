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
var UserGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_user_decorator_1 = require("../../shared/decorators/auth-user.decorator");
const user_entity_1 = require("../../entities/user.entity");
const emit_1 = require("../../shared/socket/emit");
const event_1 = require("../../shared/socket/event");
const jwtWS_guard_1 = require("../auth/guards/jwtWS.guard");
const updateProfile_dto_1 = require("./dtos/updateProfile.dto");
const user_service_1 = require("./user.service");
let UserGateway = UserGateway_1 = class UserGateway {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserGateway_1.name);
    }
    async get(authUser) {
        try {
            const user = await this.userService.updateOne({ userId: authUser.userId }, { isOnline: true });
            this.server.emit(`${emit_1.UserSocketEmit.ONLINE}/${user.userId}`, user);
            return user;
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async update(authUser, newProfile) {
        try {
            const user = await this.userService.updateOne({ userId: authUser.userId }, newProfile);
            this.server.emit(`${emit_1.UserSocketEmit.UPDATE_PROFILE}/${user.userId}`, user);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async addFriend(friendId, authUser) {
        try {
            const beFriend = await this.userService.addFriend(authUser.userId, friendId);
            this.friendInteractionNotify(emit_1.UserSocketEmit.ADD_FRIEND, beFriend);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async acceptFriend(friendId, authUser) {
        try {
            const beFriend = await this.userService.acceptFriend(authUser.userId, friendId);
            this.friendInteractionNotify(emit_1.UserSocketEmit.ACCEPT_FRIEND, beFriend);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    async block(friendId, authUser) {
        try {
            const blockedFriend = await this.userService.blockFriend(authUser.userId, friendId);
            this.friendInteractionNotify(emit_1.UserSocketEmit.BLOCK_FRIEND, blockedFriend);
        }
        catch (e) {
            this.logger.error(e);
            throw new websockets_1.WsException(e);
        }
    }
    friendInteractionNotify(event, befriend) {
        this.server.emit(`${event}/${befriend.rightUser.userId}`, befriend);
        this.server.emit(`${event}/${befriend.leftUser.userId}`, befriend);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(event_1.UserSocketEvent.ONLINE),
    __param(0, (0, auth_user_decorator_1.AuthWSUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(event_1.UserSocketEvent.UPDATE_PROFILE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, auth_user_decorator_1.AuthWSUser)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        updateProfile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(event_1.UserSocketEvent.ADD_FRIEND),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, auth_user_decorator_1.AuthWSUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "addFriend", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(event_1.UserSocketEvent.ACCEPT_FRIEND),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, auth_user_decorator_1.AuthWSUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "acceptFriend", null);
__decorate([
    (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
    (0, websockets_1.SubscribeMessage)(event_1.UserSocketEvent.BLOCK_FRIEND),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, auth_user_decorator_1.AuthWSUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "block", null);
UserGateway = UserGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'user' }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserGateway);
exports.UserGateway = UserGateway;
//# sourceMappingURL=user.gateway.js.map