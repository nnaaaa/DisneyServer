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
var GuildGateway_1
Object.defineProperty(exports, '__esModule', { value: true })
exports.GuildGateway = void 0
const common_1 = require('@nestjs/common')
const websockets_1 = require('@nestjs/websockets')
const socket_io_1 = require('socket.io')
const auth_user_decorator_1 = require('../../shared/decorators/auth-user.decorator')
const user_entity_1 = require('../../entities/user.entity')
const emit_1 = require('../../shared/socket/emit')
const event_1 = require('../../shared/socket/event')
const jwtWS_guard_1 = require('../auth/guards/jwtWS.guard')
const member_service_1 = require('../member/member.service')
const createGuild_dto_1 = require('./dtos/createGuild.dto')
const updateGuild_dto_1 = require('./dtos/updateGuild.dto')
const guild_service_1 = require('./guild.service')
let GuildGateway = (GuildGateway_1 = class GuildGateway {
    constructor(guildService, memberService) {
        this.guildService = guildService
        this.memberService = memberService
        this.logger = new common_1.Logger(GuildGateway_1.name)
    }
    async create(authUser, createGuildDto) {
        try {
            return await this.guildService.createTemplateGuild(createGuildDto, authUser)
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async update(updateGuildDto) {
        try {
            await this.guildService.updateOne(
                { guildId: updateGuildDto.guildId },
                updateGuildDto
            )
            this.server.emit(
                `${emit_1.GuildSocketEmit.UPDATE}/${updateGuildDto.guildId}`,
                updateGuildDto
            )
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async getOne(guildId, authUser) {
        try {
            const guild = await this.guildService.findOneWithRelation({ guildId })
            const member = guild.members.find((m) => m.user.userId === authUser.userId)
            for (let ctg of guild.categories) {
                ctg.channels = ctg.channels.filter((channel) => {
                    if (!channel.isPrivate) return true
                    for (let member of channel.members) {
                        if (member.user.userId === authUser.userId) {
                            return true
                        }
                    }
                    for (let role of channel.roles) {
                        for (let member of role.members) {
                            if (member.user.userId === authUser.userId) {
                                return true
                            }
                        }
                    }
                    return false
                })
            }
            return { guild, member }
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async getOfMe({ userId }) {
        try {
            const joinedGuilds = await this.memberService.findManyWithRelation({
                user: { userId },
            })
            const guilds = joinedGuilds.map((j) => j.guild)
            return guilds
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async delete(guildId) {
        try {
            await this.guildService.deleteOne({ guildId })
            this.server.emit(`${emit_1.GuildSocketEmit.DELETE}/${guildId}`)
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
})
__decorate(
    [(0, websockets_1.WebSocketServer)(), __metadata('design:type', socket_io_1.Server)],
    GuildGateway.prototype,
    'server',
    void 0
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.GuildSocketEvent.CREATE),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, auth_user_decorator_1.AuthWSUser)()),
        __param(1, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [
            user_entity_1.UserEntity,
            createGuild_dto_1.CreateGuildDto,
        ]),
        __metadata('design:returntype', Promise),
    ],
    GuildGateway.prototype,
    'create',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.GuildSocketEvent.UPDATE),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [updateGuild_dto_1.UpdateGuildDto]),
        __metadata('design:returntype', Promise),
    ],
    GuildGateway.prototype,
    'update',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.GuildSocketEvent.GET_ONE),
        __param(0, (0, websockets_1.MessageBody)()),
        __param(1, (0, auth_user_decorator_1.AuthWSUser)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String, user_entity_1.UserEntity]),
        __metadata('design:returntype', Promise),
    ],
    GuildGateway.prototype,
    'getOne',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.GuildSocketEvent.GET_JOINED),
        __param(0, (0, auth_user_decorator_1.AuthWSUser)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [user_entity_1.UserEntity]),
        __metadata('design:returntype', Promise),
    ],
    GuildGateway.prototype,
    'getOfMe',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWS_guard_1.JwtWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.GuildSocketEvent.DELETE),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String]),
        __metadata('design:returntype', Promise),
    ],
    GuildGateway.prototype,
    'delete',
    null
)
GuildGateway = GuildGateway_1 = __decorate(
    [
        (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: 'guild' }),
        __metadata('design:paramtypes', [
            guild_service_1.GuildService,
            member_service_1.MemberService,
        ]),
    ],
    GuildGateway
)
exports.GuildGateway = GuildGateway
//# sourceMappingURL=guild.gateway.js.map
