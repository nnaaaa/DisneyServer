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
exports.EmojiService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const emoji_entity_1 = require("../../../entities/emoji.entity");
const emoji_repository_1 = require("../../../repositories/emoji.repository");
const react_service_1 = require("../react/react.service");
let EmojiService = class EmojiService {
    constructor(emojiRepository, reactService) {
        this.emojiRepository = emojiRepository;
        this.reactService = reactService;
        this.emojiRelations = {
            reacts: true,
        };
    }
    async save(emoji) {
        return await this.emojiRepository.save(emoji);
    }
    create(createEmojiDto, guildOfEmojiDto) {
        const newemoji = this.emojiRepository.create(Object.assign(Object.assign({}, createEmojiDto), { guild: guildOfEmojiDto }));
        return newemoji;
    }
    async findOneWithRelation(findCondition) {
        return await this.emojiRepository.findOne({
            relations: this.emojiRelations,
            where: findCondition,
        });
    }
    async findManyWithRelation(findCondition) {
        return await this.emojiRepository.find({
            relations: this.emojiRelations,
            where: findCondition,
        });
    }
    async updateOne(updateemojiDto) {
        try {
            let emoji = await this.findOneWithRelation({
                emojiId: updateemojiDto.emojiId,
            });
            emoji = Object.assign(emoji, updateemojiDto);
            return await this.save(emoji);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteOne(findCondition) {
        try {
            const emoji = await this.findOneWithRelation(findCondition);
            if (emoji) {
                const reacts = [];
                for (const react of emoji.reacts) {
                    reacts.push(this.reactService.deleteOne({ reactId: react.reactId }));
                }
                await Promise.all(reacts);
                await this.emojiRepository.remove(emoji);
            }
            return emoji;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteMany(findCondition) {
        try {
            const emojis = await this.findManyWithRelation(findCondition);
            for (const emoji of emojis) {
                const reacts = [];
                for (const react of emoji.reacts) {
                    reacts.push(this.reactService.deleteOne({ reactId: react.reactId }));
                }
                await Promise.all(reacts);
                await this.emojiRepository.remove(emoji);
            }
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
};
EmojiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(emoji_entity_1.EmojiEntity)),
    __metadata("design:paramtypes", [emoji_repository_1.EmojiRepository,
        react_service_1.ReactService])
], EmojiService);
exports.EmojiService = EmojiService;
//# sourceMappingURL=emoji.service.js.map