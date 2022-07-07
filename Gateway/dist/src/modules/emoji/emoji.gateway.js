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
var EmojiGateway_1
Object.defineProperty(exports, '__esModule', { value: true })
exports.EmojiGateway = void 0
const common_1 = require('@nestjs/common')
const websockets_1 = require('@nestjs/websockets')
const socket_io_1 = require('socket.io')
const dtos_1 = require('../../shared/dtos')
const emit_1 = require('../../shared/socket/emit')
const event_1 = require('../../shared/socket/event')
const jwtWS_guard_1 = require('../auth/guards/jwtWS.guard')
const createEmoji_dto_1 = require('./dtos/createEmoji.dto')
const updateEmoji_dto_1 = require('./dtos/updateEmoji.dto')
const emoji_service_1 = require('./emoji.service')
let EmojiGateway = (EmojiGateway_1 = class EmojiGateway {
    constructor(emojiService) {
        this.emojiService = emojiService
        this.logger = new common_1.Logger(EmojiGateway_1.name)
    }
    async create(createEmojiDto, guildOfEmoji) {
        try {
            const newEmoji = this.emojiService.create(createEmojiDto, guildOfEmoji)
            const savedEmoji = await this.emojiService.save(newEmoji)
            this.server.emit(
                `${guildOfEmoji.guildId}/${emit_1.EmojiSocketEmit.CREATE}`,
                savedEmoji
            )
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async update(updateEmojiDto) {
        try {
            this.emojiService.updateOne(updateEmojiDto)
            this.server.emit(
                `${emit_1.EmojiSocketEmit.UPDATE}/${updateEmojiDto.emojiId}`,
                updateEmojiDto
            )
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async delete(emojiId) {
        try {
            this.emojiService.deleteOne({ emojiId })
            this.server.emit(`${emit_1.EmojiSocketEmit.DELETE}/${emojiId}`, emojiId)
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
})
__decorate(
    [(0, websockets_1.WebSocketServer)(), __metadata('design:type', socket_io_1.Server)],
    EmojiGateway.prototype,
    'server',
    void 0
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.EmojiSocketEvent.CREATE),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, websockets_1.MessageBody)('emoji')),
        __param(1, (0, websockets_1.MessageBody)('guild')),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [
            createEmoji_dto_1.CreateEmojiDto,
            dtos_1.GuildDto,
        ]),
        __metadata('design:returntype', Promise),
    ],
    EmojiGateway.prototype,
    'create',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.EmojiSocketEvent.UPDATE),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [updateEmoji_dto_1.UpdateEmojiDto]),
        __metadata('design:returntype', Promise),
    ],
    EmojiGateway.prototype,
    'update',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.EmojiSocketEvent.DELETE),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String]),
        __metadata('design:returntype', Promise),
    ],
    EmojiGateway.prototype,
    'delete',
    null
)
EmojiGateway = EmojiGateway_1 = __decorate(
    [
        (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'emoji' }),
        __metadata('design:paramtypes', [emoji_service_1.EmojiService]),
    ],
    EmojiGateway
)
exports.EmojiGateway = EmojiGateway
//# sourceMappingURL=emoji.gateway.js.map
