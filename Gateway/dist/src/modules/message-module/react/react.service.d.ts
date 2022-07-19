import { ReactEntity } from 'src/entities/react.entity'
import { ReactRepository } from 'src/repositories/react.repository'
import { EmojiDto } from 'src/shared/dtos/emoji.dto'
import { DeepPartial, FindOptionsRelations, FindOptionsWhere } from 'typeorm'
import { CreateReactDto } from './dtos/createReact.dto'
export declare class ReactService {
    private reactRepository
    readonly emojiRelations: FindOptionsRelations<ReactEntity>
    constructor(reactRepository: ReactRepository)
    save(react: ReactEntity): Promise<ReactEntity>
    create(react: DeepPartial<ReactEntity>): ReactEntity
    findOneWithRelation(
        findCondition: FindOptionsWhere<ReactEntity>
    ): Promise<ReactEntity>
    updateOne(reactId: string, emojiOfReactDto: EmojiDto): Promise<ReactEntity>
    deleteOne(findCondition: FindOptionsWhere<ReactEntity>): Promise<void>
    deleteMany(findCondition: FindOptionsWhere<ReactEntity>): Promise<void>
    reactToMessage(createReactDto: CreateReactDto): Promise<ReactEntity>
}
