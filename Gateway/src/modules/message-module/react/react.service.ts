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
        const react = this.create(createReactDto)

        return await this.save(react)
    }
}
