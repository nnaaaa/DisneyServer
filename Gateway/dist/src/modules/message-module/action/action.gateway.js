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
var ActionGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const role_permission_decorator_1 = require("../../../shared/decorators/role-permission.decorator");
const dtos_1 = require("../../../shared/dtos");
const permission_guard_1 = require("../../../shared/guards/permission.guard");
const emit_1 = require("../../../shared/socket/emit");
const event_1 = require("../../../shared/socket/event");
const namespace_1 = require("../../../shared/socket/namespace");
const jwtWSUser_guard_1 = require("../../auth-module/auth/guards/jwtWSUser.guard");
const action_service_1 = require("./action.service");
let ActionGateway = ActionGateway_1 = class ActionGateway {
    constructor(actionService) {
        this.actionService = actionService;
        this.logger = new common_1.Logger(ActionGateway_1.name);
    }
    async create(messageOfActionDto) {
        try {
            const action = await this.actionService.create({
                message: messageOfActionDto,
            });
            const savedAction = await this.actionService.save(action);
            this.server.emit(`${messageOfActionDto.messageId}/${emit_1.ActionSocketEmit.CREATE}`, savedAction);
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
], ActionGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
    (0, role_permission_decorator_1.RolePermissions)(['CREATE_MESSAGE']),
    (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
    (0, websockets_1.SubscribeMessage)(event_1.ActionSocketEvent.CREATE),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, websockets_1.MessageBody)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.MessageDto]),
    __metadata("design:returntype", Promise)
], ActionGateway.prototype, "create", null);
ActionGateway = ActionGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: namespace_1.SocketNamespace.ACTION }),
    __metadata("design:paramtypes", [action_service_1.ActionService])
], ActionGateway);
exports.ActionGateway = ActionGateway;
//# sourceMappingURL=action.gateway.js.map