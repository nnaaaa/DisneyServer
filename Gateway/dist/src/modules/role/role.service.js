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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channel_entity_1 = require("../../entities/channel.entity");
const guild_entity_1 = require("../../entities/guild.entity");
const role_entity_1 = require("../../entities/role.entity");
const channel_repository_1 = require("../../repositories/channel.repository");
const guild_repository_1 = require("../../repositories/guild.repository");
const role_repository_1 = require("../../repositories/role.repository");
const guild_member_service_1 = require("../guild-member/guild-member.service");
let RoleService = class RoleService {
    constructor(roleRepository, guildRepository, channelRepository, guildMemberService) {
        this.roleRepository = roleRepository;
        this.guildRepository = guildRepository;
        this.channelRepository = channelRepository;
        this.guildMemberService = guildMemberService;
        this.roleRelations = {
            members: true,
            channels: true,
        };
    }
    async save(role) {
        return await this.roleRepository.save(role);
    }
    async create(createDto, guild) {
        const role = this.roleRepository.create(Object.assign(Object.assign({}, createDto), { guild, members: [], channels: [] }));
        return role;
    }
    async findOneWithReletion(findCondition) {
        return await this.roleRepository.findOne({
            where: findCondition,
            relations: this.roleRelations,
        });
    }
    async update(findCondition, updateCondition) {
        try {
            await this.roleRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async delete(findCondition) {
        try {
            const role = await this.findOneWithReletion(findCondition);
            role.channels = [];
            role.members = [];
            await this.roleRepository.remove(role);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async addToMember({ roleId, guildMemberId }) {
        const role = await this.findOneWithReletion({ roleId });
        const member = await this.guildMemberService.findOneWithRelation({
            guildMemberId,
        });
        if (!member || !role)
            throw new common_1.NotFoundException();
        member.roles.push(role);
        role.members.push(member);
        await this.save(role);
        return { role, member };
    }
    async removeFromMember({ roleId, guildMemberId }) {
        const role = await this.findOneWithReletion({ roleId });
        const member = await this.guildMemberService.findOneWithRelation({
            guildMemberId,
        });
        if (!member || !role)
            throw new common_1.NotFoundException();
        member.roles = member.roles.filter((role) => role.roleId !== roleId);
        role.members = role.members.filter((member) => member.guildMemberId !== guildMemberId);
        await this.save(role);
        return { role, member };
    }
    async addToChannel({ roleId, channelId }) {
        const role = await this.findOneWithReletion({ roleId });
        const channel = await this.channelRepository.findOneBy({
            channelId,
        });
        if (!channel || !role)
            throw new common_1.NotFoundException();
        role.channels.push(channel);
        channel.roles.push(role);
        await this.save(role);
        return { role, channel };
    }
    async removeFromChannel({ roleId, channelId }) {
        const role = await this.findOneWithReletion({ roleId });
        const channel = await this.channelRepository.findOneBy({
            channelId,
        });
        if (!channel || !role)
            throw new common_1.NotFoundException();
        channel.roles = channel.roles.filter((role) => role.roleId !== roleId);
        role.channels = role.channels.filter((channel) => channel.channelId !== channelId);
        await this.save(role);
        return { role, channel };
    }
    async createByGuildIdAndSave(createDto, guildId) {
        const guild = await this.guildRepository.findOneBy({ guildId });
        const role = await this.create(createDto, guild);
        const savedRole = await this.roleRepository.save(role);
        return savedRole;
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(guild_entity_1.GuildEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(channel_entity_1.ChannelEntity)),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository,
        guild_repository_1.GuildRepository,
        channel_repository_1.ChannelRepository,
        guild_member_service_1.GuildMemberService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map