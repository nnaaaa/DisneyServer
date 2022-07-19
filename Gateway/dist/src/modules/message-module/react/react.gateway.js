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
var ReactGateway_1
Object.defineProperty(exports, '__esModule', { value: true })
exports.ReactGateway = void 0
const common_1 = require('@nestjs/common')
const websockets_1 = require('@nestjs/websockets')
const socket_io_1 = require('socket.io')
const role_permission_decorator_1 = require('../../../shared/decorators/role-permission.decorator')
const dtos_1 = require('../../../shared/dtos')
const permission_guard_1 = require('../../../shared/guards/permission.guard')
const emit_1 = require('../../../shared/socket/emit')
const event_1 = require('../../../shared/socket/event')
const namespace_1 = require('../../../shared/socket/namespace')
const jwtWSUser_guard_1 = require('../../auth-module/auth/guards/jwtWSUser.guard')
const createReact_dto_1 = require('./dtos/createReact.dto')
const react_service_1 = require('./react.service')
let ReactGateway = (ReactGateway_1 = class ReactGateway {
    constructor(reactService) {
        this.reactService = reactService
        this.logger = new common_1.Logger(ReactGateway_1.name)
    }
    async create(createReactDto) {
        try {
            const react = await this.reactService.reactToMessage(createReactDto)
            this.server.emit(
                `${createReactDto.action.actionId}/${emit_1.ReactSocketEmit.CREATE}`,
                react
            )
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
    async update(reactId, emojiOfReactDto) {
        try {
            const updatedReact = await this.reactService.updateOne(
                reactId,
                emojiOfReactDto
            )
            this.server.emit(`${emit_1.ReactSocketEmit.UPDATE}/${reactId}`, updatedReact)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
    async delete(reactId) {
        try {
            this.reactService.deleteOne({ reactId })
            this.server.emit(`${emit_1.ReactSocketEmit.DELETE}/${reactId}`, reactId)
        } catch (e) {
            this.logger.error(e)
            return e
        }
    }
})
__decorate(
    [(0, websockets_1.WebSocketServer)(), __metadata('design:type', socket_io_1.Server)],
    ReactGateway.prototype,
    'server',
    void 0
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, role_permission_decorator_1.RolePermissions)(['CUD_REACT']),
        (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
        (0, websockets_1.SubscribeMessage)(event_1.ReactSocketEvent.CREATE),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [createReact_dto_1.CreateReactDto]),
        __metadata('design:returntype', Promise),
    ],
    ReactGateway.prototype,
    'create',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, role_permission_decorator_1.RolePermissions)(['CUD_REACT']),
        (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
        (0, websockets_1.SubscribeMessage)(event_1.ReactSocketEvent.UPDATE),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, websockets_1.MessageBody)('reactId')),
        __param(1, (0, websockets_1.MessageBody)('emoji')),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String, dtos_1.EmojiDto]),
        __metadata('design:returntype', Promise),
    ],
    ReactGateway.prototype,
    'update',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, role_permission_decorator_1.RolePermissions)(['CUD_REACT']),
        (0, common_1.UseGuards)(permission_guard_1.GuildPermissionGuard),
        (0, websockets_1.SubscribeMessage)(event_1.ReactSocketEvent.DELETE),
        __param(0, (0, websockets_1.MessageBody)('reactId')),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String]),
        __metadata('design:returntype', Promise),
    ],
    ReactGateway.prototype,
    'delete',
    null
)
ReactGateway = ReactGateway_1 = __decorate(
    [
        (0, websockets_1.WebSocketGateway)({
            cors: { origin: '*' },
            namespace: namespace_1.SocketNamespace.REACT,
        }),
        __metadata('design:paramtypes', [react_service_1.ReactService]),
    ],
    ReactGateway
)
exports.ReactGateway = ReactGateway
//# sourceMappingURL=react.gateway.js.map
