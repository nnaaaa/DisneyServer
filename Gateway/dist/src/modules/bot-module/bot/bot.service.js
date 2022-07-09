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
exports.BotService = void 0
const common_1 = require('@nestjs/common')
const typeorm_1 = require('@nestjs/typeorm')
const bot_entity_1 = require('../../../entities/bot.entity')
const auth_service_1 = require('../../auth-module/auth/auth.service')
const bot_repository_1 = require('../../../repositories/bot.repository')
let BotService = class BotService {
    constructor(botRepository, authService) {
        this.botRepository = botRepository
        this.authService = authService
        this.botRelations = {
            commands: true,
            joinedGuilds: { guild: true },
        }
    }
    async save(bot) {
        return this.botRepository.save(bot)
    }
    async create(createBotDto) {
        const bot = this.botRepository.create(
            Object.assign({ requiredPermissions: [] }, createBotDto)
        )
        bot.secretKey = await this.authService.getBotAccessToken(bot.botId)
        return bot
    }
    async findOneWithRelation(findCondition) {
        return await this.botRepository.findOne({
            relations: this.botRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition) {
        return await this.botRepository.find({
            relations: this.botRelations,
            where: findCondition,
        })
    }
    async updateOne(findCondition, updateCondition) {
        try {
            let bot = await this.findOneWithRelation(findCondition)
            bot = Object.assign(bot, updateCondition)
            return await this.save(bot)
        } catch (e) {
            throw new common_1.InternalServerErrorException()
        }
    }
    async deleteOne(findCondition) {
        try {
            let bot = await this.findOneWithRelation(findCondition)
            return await this.botRepository.remove(bot)
        } catch (e) {
            throw new common_1.InternalServerErrorException()
        }
    }
    async genSecretKey(genSecretKeyDto) {
        const bot = await this.findOneWithRelation({ botId: genSecretKeyDto.botId })
        if (!bot) throw new common_1.NotFoundException()
        if (bot.secretKey !== genSecretKeyDto.oldSecretKey)
            throw new common_1.ForbiddenException()
        const newKey = await this.authService.getBotAccessToken(bot.botId)
        bot.secretKey = newKey
        await this.save(bot)
        return newKey
    }
    async findByGuild(guildEntity) {
        const botList = await this.botRepository
            .createQueryBuilder('bot')
            .leftJoinAndSelect('bot.commands', 'command')
            .innerJoin('bot.joinedGuilds', 'member')
            .innerJoin('member.guild', 'guild')
            .where('guild.guildId = :guildId', { guildId: guildEntity.guildId })
            .getMany()
        return botList
    }
}
BotService = __decorate(
    [
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(bot_entity_1.BotEntity)),
        __metadata('design:paramtypes', [
            bot_repository_1.BotRepository,
            auth_service_1.AuthService,
        ]),
    ],
    BotService
)
exports.BotService = BotService
//# sourceMappingURL=bot.service.js.map
