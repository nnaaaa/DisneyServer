import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EmojiEntity } from 'src/entities/emoji.entity'
import { EmojiRepository } from 'src/repositories/emoji.repository'
import { GuildDto } from 'src/shared/dtos'
import { FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { ReactService } from '../react/react.service'
import { CreateEmojiDto } from './dtos/createEmoji.dto'
import { UpdateEmojiDto } from './dtos/updateEmoji.dto'

@Injectable()
export class EmojiService {
    public readonly emojiRelations: FindOptionsRelations<EmojiEntity> = {
        reacts: true,
    }

    constructor(
        @InjectRepository(EmojiEntity) private emojiRepository: EmojiRepository,
        private reactService: ReactService
    ) {}

    async save(emoji: EmojiEntity) {
        return await this.emojiRepository.save(emoji)
    }

    create(createEmojiDto: CreateEmojiDto, guildOfEmojiDto: GuildDto) {
        const newemoji = this.emojiRepository.create({
            ...createEmojiDto,
            guild: guildOfEmojiDto,
        })

        return newemoji
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<EmojiEntity>) {
        return await this.emojiRepository.findOne({
            relations: this.emojiRelations,
            where: findCondition,
        })
    }
    async findManyWithRelation(findCondition: FindOptionsWhere<EmojiEntity>) {
        return await this.emojiRepository.find({
            relations: this.emojiRelations,
            where: findCondition,
        })
    }

    async updateOne(updateemojiDto: UpdateEmojiDto) {
        try {
            let emoji = await this.findOneWithRelation({
                emojiId: updateemojiDto.emojiId,
            })

            emoji = Object.assign(emoji, updateemojiDto)

            return await this.save(emoji)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<EmojiEntity>) {
        try {
            const emoji = await this.findOneWithRelation(findCondition)

            if (emoji) {
                const reacts = []
                for (const react of emoji.reacts) {
                    reacts.push(this.reactService.deleteOne({ reactId: react.reactId }))
                }
                await Promise.all(reacts)

                await this.emojiRepository.remove(emoji)
            }

            return emoji
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteMany(findCondition: FindOptionsWhere<EmojiEntity>) {
        try {
            const emojis = await this.findManyWithRelation(findCondition)

            for (const emoji of emojis) {
                const reacts = []
                for (const react of emoji.reacts) {
                    reacts.push(this.reactService.deleteOne({ reactId: react.reactId }))
                }
                await Promise.all(reacts)

                await this.emojiRepository.remove(emoji)
            }
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }
}
