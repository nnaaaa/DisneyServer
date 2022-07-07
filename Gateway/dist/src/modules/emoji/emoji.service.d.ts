import { EmojiEntity } from 'src/entities/emoji.entity'
import { EmojiRepository } from 'src/repositories/emoji.repository'
import { GuildDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { ReactService } from '../react/react.service'
import { CreateEmojiDto } from './dtos/createEmoji.dto'
import { UpdateEmojiDto } from './dtos/updateEmoji.dto'
export declare class EmojiService {
    private emojiRepository
    private reactService
    readonly emojiRelations: FindOptionsRelations<EmojiEntity>
    constructor(emojiRepository: EmojiRepository, reactService: ReactService)
    save(emoji: EmojiEntity): Promise<EmojiEntity>
    create(createEmojiDto: CreateEmojiDto, guildOfEmojiDto: GuildDto): EmojiEntity
    findOneWithRelation(
        findCondition: FindOptionsWhere<EmojiEntity>
    ): Promise<EmojiEntity>
    findManyWithRelation(
        findCondition: FindOptionsWhere<EmojiEntity>
    ): Promise<EmojiEntity[]>
    updateOne(updateemojiDto: UpdateEmojiDto): Promise<EmojiEntity>
    deleteOne(findCondition: FindOptionsWhere<EmojiEntity>): Promise<EmojiEntity>
    deleteMany(findCondition: FindOptionsWhere<EmojiEntity>): Promise<void>
}
