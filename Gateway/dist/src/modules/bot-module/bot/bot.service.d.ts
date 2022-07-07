import { BotEntity } from 'src/entities/bot.entity'
import { GuildEntity } from 'src/entities/guild.entity'
import { AuthService } from 'src/modules/auth-module/auth/auth.service'
import { BotRepository } from 'src/repositories/bot.repository'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { CreateBotDto } from './dtos/createBot.dto'
import { GenSecretKeyDto } from './dtos/genSecretKey.dto'
export declare class BotService {
    private botRepository
    private authService
    readonly botRelations: FindOptionsRelations<BotEntity>
    constructor(botRepository: BotRepository, authService: AuthService)
    save(bot: BotEntity): Promise<BotEntity>
    create(createBotDto: CreateBotDto): Promise<BotEntity>
    findOneWithRelation(findCondition: FindOptionsWhere<BotEntity>): Promise<BotEntity>
    findManyWithRelation(findCondition: FindOptionsWhere<BotEntity>): Promise<BotEntity[]>
    updateOne(
        findCondition: FindOptionsWhere<BotEntity>,
        updateCondition: QueryDeepPartialEntity<BotEntity>
    ): Promise<BotEntity>
    deleteOne(findCondition: FindOptionsWhere<BotEntity>): Promise<BotEntity>
    genSecretKey(genSecretKeyDto: GenSecretKeyDto): Promise<string>
    findByGuild(guildEntity: GuildEntity): Promise<BotEntity[]>
}
