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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const guild_entity_1 = require("../../entities/guild.entity");
const guild_repository_1 = require("../../repositories/guild.repository");
const default_1 = require("../../shared/default");
const channel_category_service_1 = require("../channel-category/channel-category.service");
const guild_member_service_1 = require("../guild-member/guild-member.service");
const role_service_1 = require("../role/role.service");
const channel_service_1 = require("./../channel/channel.service");
let GuildService = class GuildService {
    constructor(channelCtgService, channelService, roleService, guildMemberService, guildRepository) {
        this.channelCtgService = channelCtgService;
        this.channelService = channelService;
        this.roleService = roleService;
        this.guildMemberService = guildMemberService;
        this.guildRepository = guildRepository;
        this.guildRelations = {
            members: this.guildMemberService.guildMemberRelations,
            categories: this.channelCtgService.channelCtgRelations,
            roles: this.roleService.roleRelations,
        };
    }
    async saveGuild(guild) {
        return await this.guildRepository.save(guild);
    }
    async createGuild(createGuildDto, creator) {
        const guild = this.guildRepository.create(Object.assign(Object.assign({}, createGuildDto), { categories: [], members: [] }));
        return guild;
    }
    async findOneGuild(findCondition) {
        return await this.guildRepository.findOne({
            where: findCondition,
        });
    }
    async findOneGuildWithRelation(findCondition) {
        return await this.guildRepository.findOne({
            relations: this.guildRelations,
            where: findCondition,
        });
    }
    async findManyGuild(findCondition) {
        return await this.guildRepository.find({
            where: findCondition,
        });
    }
    async updateOneGuild(findCondition, updateCondition) {
        try {
            await this.guildRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteGuild(findCondition) {
        try {
            const guild = await this.findOneGuildWithRelation(findCondition);
            let removeChildren = [];
            for (const ctg of guild.categories) {
                removeChildren.push(this.channelService.delete({
                    category: { categoryId: ctg.categoryId },
                }));
            }
            removeChildren = removeChildren.concat([
                this.channelCtgService.delete({
                    guild: { guildId: guild.guildId },
                }),
                this.guildMemberService.delete({
                    guild: { guildId: guild.guildId },
                }),
                this.roleService.delete({ guild: { guildId: guild.guildId } }),
            ]);
            await Promise.all(removeChildren);
            await this.guildRepository.remove(guild);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async createTemplateGuild(createGuildDto, creator) {
        const guild = await this.createGuild(createGuildDto, creator);
        const savedGuild = await this.saveGuild(guild);
        const joinedGuild = await this.guildMemberService.create(savedGuild, creator);
        const savedJoinedGuild = await this.guildMemberService.save(joinedGuild);
        const role = await this.roleService.create({ name: default_1.Default.everyOneRoleName }, savedGuild);
        const category1 = await this.channelCtgService.create({ name: 'Category 1' }, savedGuild);
        const category2 = await this.channelCtgService.create({ name: 'Category 2' }, savedGuild);
        const savedCategory1 = await this.channelCtgService.save(category1);
        const savedCategory2 = await this.channelCtgService.save(category2);
        const channelLobby1 = await this.channelService.create({ name: 'lobby' }, category1);
        channelLobby1.roles = [role];
        channelLobby1.members = [savedJoinedGuild];
        const channelDoc1 = await this.channelService.create({ name: 'document' }, category1);
        channelDoc1.roles = [role];
        channelDoc1.members = [savedJoinedGuild];
        const channelLobby2 = await this.channelService.create({ name: 'lobby' }, category2);
        channelLobby2.roles = [role];
        channelLobby2.members = [savedJoinedGuild];
        const channelDoc2 = await this.channelService.create({ name: 'document' }, category2);
        channelDoc2.roles = [role];
        channelDoc2.members = [savedJoinedGuild];
        category1.channels = [channelLobby1, channelDoc1];
        category2.channels = [channelLobby2, channelDoc2];
        savedGuild.categories = [savedCategory1, savedCategory2];
        savedGuild.members = [savedJoinedGuild];
        savedGuild.roles = [role];
        const savedGuildTheSecond = await this.saveGuild(savedGuild);
        return savedGuildTheSecond;
    }
    async joinGuild(guildId, user) {
        const guild = await this.findOneGuildWithRelation({ guildId });
        const defaultRoleInThisGuild = await this.roleService.findOneWithReletion({
            guild: { guildId },
            name: default_1.Default.everyOneRoleName,
        });
        const joinGuild = await this.guildMemberService.create(guild, user);
        if (defaultRoleInThisGuild)
            joinGuild.roles = [defaultRoleInThisGuild];
        guild.members.push(joinGuild);
        const savedJoinGuild = await this.guildMemberService.save(joinGuild);
        const savedGuild = await this.saveGuild(guild);
        return { guild: savedGuild, newMember: savedJoinGuild };
    }
    async leaveGuild(userId, guildId) {
        const joinGuild = await this.guildMemberService.delete({
            user: { userId },
            guild: { guildId },
        });
        return joinGuild;
    }
};
GuildService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(guild_entity_1.GuildEntity)),
    __metadata("design:paramtypes", [channel_category_service_1.ChannelCategoryService,
        channel_service_1.ChannelService,
        role_service_1.RoleService,
        guild_member_service_1.GuildMemberService,
        guild_repository_1.GuildRepository])
], GuildService);
exports.GuildService = GuildService;
//# sourceMappingURL=guild.service.js.map