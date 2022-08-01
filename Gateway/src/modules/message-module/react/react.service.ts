import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReactEntity } from 'src/entities/react.entity'
import { ReactRepository } from 'src/repositories/react.repository'
import { EmojiDto } from 'src/shared/dtos/emoji.dto'
import { DeepPartial, FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { CreateReactDto } from './dtos/createReact.dto'

@Injectable()
export class ReactService {
    public readonly reactRelations: FindOptionsRelations<ReactEntity> = {
        action: true,
        emoji: true,
        author: true,
    }

    constructor(
        @InjectRepository(ReactEntity) private reactRepository: ReactRepository
    ) {}

    async save(react: ReactEntity) {
        return await this.reactRepository.save(react)
    }

    async create(react: DeepPartial<ReactEntity>) {
        const newReact = this.reactRepository.create(react)

        return newReact
    }

    async findOneWithRelation(findCondition: FindOptionsWhere<ReactEntity>) {
        return await this.reactRepository.findOne({
            relations: this.reactRelations,
            where: findCondition,
        })
    }

    async updateOne(reactId: string, emojiOfReactDto: EmojiDto) {
        try {
            const react = await this.findOneWithRelation({ reactId })

            if (react) {
                this.reactRepository.merge(react, { emoji: emojiOfReactDto })

                return await this.save(react)
            } else throw new NotFoundException()
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

    async reactToMessage(createReactDto: CreateReactDto) {
        const existedReact = await this.findOneWithRelation({
            author: { memberId: createReactDto.author.memberId },
            emoji: { emojiId: createReactDto.emoji.emojiId },
        })
        if (existedReact) {
            await this.deleteOne({ reactId: existedReact.reactId })
            return { react: existedReact, type: 'delete' }
        } else {
            const react = await this.create(createReactDto)
            return { react: await this.save(react), type: 'create' }
        }
    }
}
