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
exports.GuildService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const guild_entity_1 = require('../../../entities/guild.entity')
const guild_repository_1 = require('../../../repositories/guild.repository')
const default_1 = require('../../../shared/default')
const channel_category_service_1 = require('../channel-category/channel-category.service')
const emoji_service_1 = require('../../message-module/emoji/emoji.service')
const member_service_1 = require('../member/member.service')
const role_service_1 = require('../role/role.service')
let GuildService = class GuildService {
    constructor(
        channelCtgService,
        roleService,
        memberService,
        emojiService,
        guildRepository
    ) {
        this.channelCtgService = channelCtgService
        this.roleService = roleService
        this.memberService = memberService
        this.emojiService = emojiService
        this.guildRepository = guildRepository
        this.guildRelations = {
            members: this.memberService.guildMemberRelations,
            categories: this.channelCtgService.channelCtgRelations,
            roles: this.roleService.roleRelations,
            emojis: this.emojiService.emojiRelations,
        }
    }
    async save(guild) {
        return await this.guildRepository.save(guild)
    }
    async create(createGuildDto, creator) {
        const guild = this.guildRepository.create(
            Object.assign(Object.assign({}, createGuildDto), {
                categories: [],
                members: [],
            })
        )
        return guild
    }
    async findOne(findCondition) {
        return await this.guildRepository.findOne({
            where: findCondition,
        })
    }
    async findOneWithRelation(findCondition) {
        return await this.guildRepository.findOne({
            relations: this.guildRelations,
            where: findCondition,
        })
    }
    async findMany(findCondition) {
        return await this.guildRepository.find({
            where: findCondition,
        })
    }
    async updateOne(findCondition, updateCondition) {
        try {
            await this.guildRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute()
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async deleteOne(findCondition) {
        try {
            const guild = await this.findOneWithRelation(findCondition)
            if (guild) {
                let removeChildren = []
                removeChildren = removeChildren.concat([
                    this.channelCtgService.deleteMany({
                        guild: { guildId: guild.guildId },
                    }),
                    this.roleService.deleteMany({ guild: { guildId: guild.guildId } }),
                    this.emojiService.deleteMany({ guild: { guildId: guild.guildId } }),
                ])
                await Promise.all(removeChildren)
                await this.memberService.deleteMany({
                    guild: { guildId: guild.guildId },
                })
                await this.guildRepository.remove(guild)
            }
        } catch (e) {
            throw new common_1.InternalServerErrorException(e)
        }
    }
    async findByMessage(messagEntity) {
        const guild = this.guildRepository
            .createQueryBuilder('guild')
            .leftJoinAndSelect('guild.categories', 'categories')
            .leftJoinAndSelect('categories.channels', 'channels')
            .innerJoin('guild.categories', 'category')
            .innerJoin('category.channels', 'channel')
            .where('channel.channelId = :channelId', {
                channelId: messagEntity.channel.channelId,
            })
            .getOne()
        return guild
    }
    async createTemplateGuild(createGuildDto, creator) {
        const guild = await this.create(createGuildDto, creator)
        const savedGuild = await this.save(guild)
        const member = await this.memberService.createByUser(savedGuild, creator)
        const savedMember = await this.memberService.save(member)
        const role = await this.roleService.create(
            {
                name: default_1.Default.adminRoleName,
                permissions: default_1.Default.adminPermission,
            },
            savedGuild
        )
        savedMember.roles = [role]
        const category1 = await this.channelCtgService.createTemplateCategory(
            { name: 'TFT' },
            savedGuild,
            [member],
            [role]
        )
        const category2 = await this.channelCtgService.createTemplateCategory(
            { name: 'LOL' },
            savedGuild,
            [member],
            [role]
        )
        savedGuild.categories = [category1, category2]
        savedGuild.members = [savedMember]
        savedGuild.roles = [role]
        const savedGuildTheSecond = await this.save(savedGuild)
        return savedGuildTheSecond
    }
}
GuildService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(4, (0, typeorm_1.InjectRepository)(guild_entity_1.GuildEntity)),
        __metadata('design:paramtypes', [
            channel_category_service_1.ChannelCategoryService,
            role_service_1.RoleService,
            member_service_1.MemberService,
            emoji_service_1.EmojiService,
            guild_repository_1.GuildRepository,
        ]),
    ],
    GuildService
)
exports.GuildService = GuildService
//# sourceMappingURL=guild.service.js.map
