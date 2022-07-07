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
Object.defineProperty(exports, '__esModule', { value: true })
exports.MemberService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const member_entity_1 = require('../../../entities/member.entity')
const user_entity_1 = require('../../../entities/user.entity')
const userJoinGuild_repository_1 = require('../../../repositories/userJoinGuild.repository')
const bot_dto_1 = require('../../../shared/dtos/bot.dto')
const message_service_1 = require('../../message-module/message/message.service')
const react_service_1 = require('../../message-module/react/react.service')
let MemberService = class MemberService {
    constructor(memberRepository, messageService, reactService) {
        this.memberRepository = memberRepository
        this.messageService = messageService
        this.reactService = reactService
        this.guildMemberRelations = {
            user: true,
            roles: true,
            joinedChannels: true,
            guild: true,
        }
    }
    async save(joinGuild) {
        return await this.memberRepository.save(joinGuild)
    }
    async create(guildOfMember, userOrBot) {
        const joinGuild = this.memberRepository.create({
            guild: guildOfMember,
            roles: [],
            joinedChannels: [],
        })
        joinGuild.nickname = userOrBot.name
        joinGuild.avatarUrl = userOrBot.avatarUrl
        if (userOrBot.constructor.name === user_entity_1.UserEntity.name) {
            joinGuild.user = userOrBot
        }
        if (userOrBot.constructor.name === bot_dto_1.BotDto.name) {
            joinGuild.bot = userOrBot
        }
        return joinGuild
    }
    async findOneWithRelation(findCondition) {
        return await this.memberRepository.findOne({
            relations: this.guildMemberRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition) {
        return await this.memberRepository.find({
            relations: this.guildMemberRelations,
            where: findCondition,
        })
    }
    async updateOne(findCondition, updateCondition) {
        try {
            let joinGuild = await this.findOneWithRelation(findCondition)
            joinGuild = Object.assign(joinGuild, updateCondition)
            return this.save(joinGuild)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteMany(findCondition) {
        try {
            const members = await this.findManyWithRelation(findCondition)
            for (const member of members) {
                await this.messageService.deleteMany({
                    author: { memberId: member.memberId },
                })
                await this.reactService.deleteMany({
                    author: { memberId: member.memberId },
                })
            }
            await this.memberRepository.remove(members)
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteOne(findCondition) {
        try {
            const member = await this.findOneWithRelation(findCondition)
            if (member) {
                await this.messageService.deleteMany({
                    author: { memberId: member.memberId },
                })
                await this.reactService.deleteMany({
                    author: { memberId: member.memberId },
                })
                await this.memberRepository.remove(member)
            }
            return member
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
}
MemberService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.MemberEntity)),
        __metadata('design:paramtypes', [
            userJoinGuild_repository_1.MemberRepository,
            message_service_1.MessageService,
            react_service_1.ReactService,
        ]),
    ],
    MemberService
)
exports.MemberService = MemberService
//# sourceMappingURL=member.service.js.map
