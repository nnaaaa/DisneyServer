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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channel_entity_1 = require("../../entities/channel.entity");
const channel_repository_1 = require("../../repositories/channel.repository");
const guild_member_service_1 = require("../guild-member/guild-member.service");
const role_service_1 = require("../role/role.service");
let ChannelService = class ChannelService {
    constructor(roleService, guildMemberService, channelRepository) {
        this.roleService = roleService;
        this.guildMemberService = guildMemberService;
        this.channelRepository = channelRepository;
        this.channelRelations = {
            messages: true,
            members: this.guildMemberService.guildMemberRelations,
            roles: this.roleService.roleRelations,
        };
    }
    async save(category) {
        return await this.channelRepository.save(category);
    }
    async create(createChannelDto, category) {
        const channel = this.channelRepository.create(Object.assign(Object.assign({}, createChannelDto), { category, messages: [], members: [] }));
        return channel;
    }
    async findOne(findCondition) {
        return await this.channelRepository.findOne({
            relations: this.channelRelations,
            where: findCondition,
        });
    }
    async findMany(findCondition) {
        return await this.channelRepository.find({
            relations: this.channelRelations,
            where: findCondition,
        });
    }
    async updateOne(findCondition, updateCondition) {
        try {
            await this.channelRepository
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
            await this.channelRepository
                .createQueryBuilder()
                .delete()
                .where(findCondition)
                .execute();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(channel_entity_1.ChannelEntity)),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        guild_member_service_1.GuildMemberService,
        channel_repository_1.ChannelRepository])
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map