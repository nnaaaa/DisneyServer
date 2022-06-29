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
exports.GuildMemberService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const guildMember_entity_1 = require('../../entities/guildMember.entity')
const userJoinGuild_repository_1 = require('../../repositories/userJoinGuild.repository')
let GuildMemberService = class GuildMemberService {
    constructor(userJoinGuildRepository) {
        this.userJoinGuildRepository = userJoinGuildRepository
        this.guildMemberRelations = {
            user: true,
            roles: { channels: true },
            joinedChannels: true,
            guild: true,
        }
    }
    async save(joinGuild) {
        return await this.userJoinGuildRepository.save(joinGuild)
    }
    async create(guild, user) {
        const joinGuild = this.userJoinGuildRepository.create({
            guild,
            user,
            roles: [],
            joinedChannels: [],
        })
        joinGuild.nickname = user.name
        joinGuild.avatarUrl = user.avatarUrl
        return joinGuild
    }
    async findOneWithRelation(findCondition) {
        return await this.userJoinGuildRepository.findOne({
            relations: this.guildMemberRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition) {
        return await this.userJoinGuildRepository.find({
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
    async delete(findCondition) {
        try {
            const joinGuild = await this.findOneWithRelation(findCondition)
            await this.userJoinGuildRepository.remove(joinGuild)
            return joinGuild
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
}
GuildMemberService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(
            0,
            (0, typeorm_1.InjectRepository)(guildMember_entity_1.GuildMemberEntity)
        ),
        __metadata('design:paramtypes', [
            userJoinGuild_repository_1.GuildMemberRepository,
        ]),
    ],
    GuildMemberService
)
exports.GuildMemberService = GuildMemberService
//# sourceMappingURL=guild-member.service.js.map
