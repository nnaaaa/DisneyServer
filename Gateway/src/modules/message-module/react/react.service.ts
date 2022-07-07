import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EmojiEntity } from 'src/entities/emoji.entity'
import { ReactEntity } from 'src/entities/react.entity'
import { ReactRepository } from 'src/repositories/react.repository'
import { EmojiDto } from 'src/shared/dtos/emoji.dto'
import { MemberDto } from 'src/shared/dtos/member.dto'
import { MessageDto } from 'src/shared/dtos/message.dto'
import { DeepPartial, FindOptionsRelations, FindOptionsWhere } from 'typeorm'

@Injectable()
export class ReactService {
    public readonly emojiRelations: FindOptionsRelations<ReactEntity> = {}

    constructor(
        @InjectRepository(ReactEntity) private reactRepository: ReactRepository
    ) {}

    async save(react: ReactEntity) {
        return await this.reactRepository.save(react)
    }

    create(react: DeepPartial<ReactEntity>) {
        const newReact = this.reactRepository.create(react)

        return newReact
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<ReactEntity>) {
        return await this.reactRepository.findOne({
            relations: this.emojiRelations,
            where: findCondition,
        })
    }

    async updateOne(reactId: string, emojiOfReactDto: EmojiDto) {
        try {
            const react = await this.findOneWithRelation({ reactId })

            react.emoji = emojiOfReactDto as EmojiEntity

            return await this.save(react)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteOne(findCondition: FindOptionsWhere<ReactEntity>) {
        try {
            await this.reactRepository.delete(findCondition)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteMany(findCondition: FindOptionsWhere<ReactEntity>) {
        try {
            await this.reactRepository.delete(findCondition)
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async reactToMessage(
        emojiOfReactDto: EmojiDto,
        messageOfReactDto: MessageDto,
        authorOfReactDto: MemberDto
    ) {
        const react = this.create({
            author: authorOfReactDto,
            message: messageOfReactDto,
            emoji: emojiOfReactDto,
        })

        return await this.save(react)
    }
}
