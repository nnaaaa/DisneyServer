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
var MemberGateway_1
Object.defineProperty(exports, '__esModule', { value: true })
exports.MemberGateway = void 0
const common_1 = require('@nestjs/common')
const websockets_1 = require('@nestjs/websockets')
const socket_io_1 = require('socket.io')
const user_entity_1 = require('../../../entities/user.entity')
const auth_user_decorator_1 = require('../../../shared/decorators/auth-user.decorator')
const bot_dto_1 = require('../../../shared/dtos/bot.dto')
const guild_dto_1 = require('../../../shared/dtos/guild.dto')
const emit_1 = require('../../../shared/socket/emit')
const event_1 = require('../../../shared/socket/event')
const namespace_1 = require('../../../shared/socket/namespace')
const jwtWSUser_guard_1 = require('../../auth-module/auth/guards/jwtWSUser.guard')
const updateMember_dto_1 = require('./dtos/updateMember.dto')
const member_service_1 = require('./member.service')
let MemberGateway = (MemberGateway_1 = class MemberGateway {
    constructor(memberService) {
        this.memberService = memberService
        this.logger = new common_1.Logger(MemberGateway_1.name)
    }
    async getOfMe({ userId }) {
        const joinedGuilds = await this.memberService.findManyWithRelation({
            user: { userId },
        })
        return joinedGuilds
    }
    async botJoinGuild(guildOfMemberDto, botDto) {
        try {
            const newMember = await this.memberService.createByBot(
                guildOfMemberDto,
                botDto
            )
            const savedMember = await this.memberService.save(newMember)
            this.server.emit(
                `${guildOfMemberDto.guildId}/${emit_1.MemberSocketEmit.JOIN}`,
                savedMember
            )
            return newMember
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async userJoinGuild(guildOfMemberDto, authUser) {
        try {
            const newMember = await this.memberService.createByUser(
                guildOfMemberDto,
                authUser
            )
            const savedMember = await this.memberService.save(newMember)
            this.server.emit(
                `${guildOfMemberDto.guildId}/${emit_1.MemberSocketEmit.JOIN}`,
                savedMember
            )
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async leaveGuild(memberId) {
        try {
            const memberLeaveGuild = await this.memberService.deleteOne({ memberId })
            this.server.emit(
                `${emit_1.MemberSocketEmit.LEAVE}/${memberId}`,
                memberLeaveGuild
            )
        } catch (e) {
            this.logger.error(e)
            throw new websockets_1.WsException(e)
        }
    }
    async updateMember(updateMemberDto) {
        try {
            const member = await this.memberService.updateOne(
                {
                    memberId: updateMemberDto.memberId,
                },
                updateMemberDto
            )
            this.server.emit(
                `${emit_1.MemberSocketEmit.UPDATE}/${member.memberId}`,
                member
            )
        } catch (e) {
            this.logger.error(e)
        }
    }
    memberOnline(memberId) {
        this.server.emit(`${emit_1.MemberSocketEmit.ONLINE}/${memberId}`)
    }
})
__decorate(
    [(0, websockets_1.WebSocketServer)(), __metadata('design:type', socket_io_1.Server)],
    MemberGateway.prototype,
    'server',
    void 0
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.MemberSocketEvent.GET_JOINED),
        __param(0, (0, auth_user_decorator_1.AuthWSUser)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [user_entity_1.UserEntity]),
        __metadata('design:returntype', Promise),
    ],
    MemberGateway.prototype,
    'getOfMe',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.MemberSocketEvent.BOT_JOIN),
        __param(0, (0, websockets_1.MessageBody)('guild')),
        __param(1, (0, websockets_1.MessageBody)('bot')),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [guild_dto_1.GuildDto, bot_dto_1.BotDto]),
        __metadata('design:returntype', Promise),
    ],
    MemberGateway.prototype,
    'botJoinGuild',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.MemberSocketEvent.USER_JOIN),
        __param(0, (0, websockets_1.MessageBody)('guild')),
        __param(1, (0, auth_user_decorator_1.AuthWSUser)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [guild_dto_1.GuildDto, user_entity_1.UserEntity]),
        __metadata('design:returntype', Promise),
    ],
    MemberGateway.prototype,
    'userJoinGuild',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.MemberSocketEvent.LEAVE),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String]),
        __metadata('design:returntype', Promise),
    ],
    MemberGateway.prototype,
    'leaveGuild',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, common_1.UsePipes)(new common_1.ValidationPipe()),
        (0, websockets_1.SubscribeMessage)(event_1.MemberSocketEvent.UPDATE),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [updateMember_dto_1.UpdateMemberDto]),
        __metadata('design:returntype', Promise),
    ],
    MemberGateway.prototype,
    'updateMember',
    null
)
__decorate(
    [
        (0, common_1.UseGuards)(jwtWSUser_guard_1.JwtUserWsGuard),
        (0, websockets_1.SubscribeMessage)(event_1.MemberSocketEvent.ONLINE),
        __param(0, (0, websockets_1.MessageBody)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String]),
        __metadata('design:returntype', void 0),
    ],
    MemberGateway.prototype,
    'memberOnline',
    null
)
MemberGateway = MemberGateway_1 = __decorate(
    [
        (0, websockets_1.WebSocketGateway)({
            cors: { origin: '*' },
            namespace: namespace_1.SocketNamespace.MEMBER,
        }),
        __metadata('design:paramtypes', [member_service_1.MemberService]),
    ],
    MemberGateway
)
exports.MemberGateway = MemberGateway
//# sourceMappingURL=member.gateway.js.map
