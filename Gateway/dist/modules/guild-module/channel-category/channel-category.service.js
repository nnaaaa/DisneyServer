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
exports.ChannelCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channelCategory_entity_1 = require("../../../entities/channelCategory.entity");
const channelCategory_repository_1 = require("../../../repositories/channelCategory.repository");
const channel_service_1 = require("../channel/channel.service");
let ChannelCategoryService = class ChannelCategoryService {
    constructor(channelService, channelCtgRepository) {
        this.channelService = channelService;
        this.channelCtgRepository = channelCtgRepository;
        this.channelCtgRelations = {
            channels: this.channelService.channelRelations,
        };
    }
    async save(category) {
        return await this.channelCtgRepository.save(category);
    }
    async create(createChannelCtgDto, guild) {
        const category = this.channelCtgRepository.create(Object.assign(Object.assign({}, createChannelCtgDto), { guild, channels: [] }));
        return category;
    }
    async findOneWithRelation(findCondition) {
        return await this.channelCtgRepository.findOne({
            relations: this.channelCtgRelations,
            where: findCondition,
        });
    }
    async findManyWithRelation(findCondition) {
        return await this.channelCtgRepository.find({
            relations: this.channelCtgRelations,
            where: findCondition,
        });
    }
    async updateOne(findCondition, updateCondition) {
        try {
            await this.channelCtgRepository
                .createQueryBuilder()
                .update(updateCondition)
                .where(findCondition)
                .execute();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteMany(findCondition) {
        try {
            const categories = await this.findManyWithRelation(findCondition);
            const removeChildren = [];
            for (const category of categories) {
                removeChildren.push(this.channelService.deleteMany({
                    category: { categoryId: category.categoryId },
                }));
            }
            await Promise.all(removeChildren);
            await this.channelCtgRepository.remove(categories);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteOne(findCondition) {
        try {
            const category = await this.findOneWithRelation(findCondition);
            if (category) {
                const removeChildren = [];
                for (const channel of category.channels)
                    removeChildren.push(this.channelService.deleteOne({ channelId: channel.channelId }));
                await Promise.all(removeChildren);
                await this.channelCtgRepository.remove(category);
            }
            return category;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async createTemplateCategory(createCategoryDto, guild, members, roles) {
        const category1 = await this.create(createCategoryDto, guild);
        const savedCategory = await this.save(category1);
        const channelLobby = await this.channelService.create({ name: 'lobby' }, savedCategory);
        channelLobby.roles = roles;
        channelLobby.members = members;
        const channelDoc = await this.channelService.create({ name: 'document' }, savedCategory);
        channelDoc.roles = roles;
        channelDoc.members = members;
        savedCategory.channels = [channelLobby, channelDoc];
        return savedCategory;
    }
};
ChannelCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(channelCategory_entity_1.ChannelCategoryEntity)),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        channelCategory_repository_1.ChannelCategoryRepository])
], ChannelCategoryService);
exports.ChannelCategoryService = ChannelCategoryService;
//# sourceMappingURL=channel-category.service.js.map