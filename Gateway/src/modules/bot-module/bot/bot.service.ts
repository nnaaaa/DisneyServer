import {
    ForbiddenException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BotEntity } from 'src/entities/bot.entity'
import { GuildEntity } from 'src/entities/guild.entity'
import { AuthService } from 'src/modules/auth-module/auth/auth.service'
import { MemberService } from 'src/modules/guild-module/member/member.service'
import { BotRepository } from 'src/repositories/bot.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { CreateBotDto } from './dtos/createBot.dto'
import { GenSecretKeyDto } from './dtos/genSecretKey.dto'

@Injectable()
export class BotService {
    public readonly botRelations: FindOptionsRelations<BotEntity> = {
        commands: true,
        joinedGuilds: { guild: true },
    }
    constructor(
        @InjectRepository(BotEntity) private botRepository: BotRepository,
        private authService: AuthService,
        @Inject(MemberService) private memberService: MemberService
    ) {}

    async save(bot: BotEntity) {
        return this.botRepository.save(bot)
    }

    async create(createBotDto: CreateBotDto) {
        const bot = this.botRepository.create({
            requiredPermissions: [],
            commands: [],
            ...createBotDto,
        })
        const savedBot = await this.botRepository.save(bot)

        savedBot.secretKey = await this.authService.getBotAccessToken(savedBot.botId)

        return bot
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<BotEntity>) {
        return await this.botRepository.findOne({
            relations: this.botRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition: FindOptionsWhere<BotEntity>) {
        return await this.botRepository.find({
            relations: this.botRelations,
            where: findCondition,
        })
    }

    async updateOne(
        findCondition: FindOptionsWhere<BotEntity>,
        updateCondition: QueryDeepPartialEntity<BotEntity>
    ) {
        try {
            let bot = await this.findOneWithRelation(findCondition)

            bot = Object.assign(bot, updateCondition)

            return await this.save(bot)
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<BotEntity>) {
        try {
            const bot = await this.findOneWithRelation(findCondition)

            this.memberService.deleteMany({ bot: { botId: bot.botId } })

            return await this.botRepository.remove(bot)
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async genSecretKey(genSecretKeyDto: GenSecretKeyDto) {
        const bot = await this.findOneWithRelation({ botId: genSecretKeyDto.botId })

        if (!bot) throw new NotFoundException()

        if (bot.secretKey !== genSecretKeyDto.oldSecretKey) throw new ForbiddenException()

        const newKey = await this.authService.getBotAccessToken(bot.botId)

        bot.secretKey = newKey

        await this.save(bot)

        return newKey
    }

    async findByGuild(guildEntity: GuildEntity) {
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
