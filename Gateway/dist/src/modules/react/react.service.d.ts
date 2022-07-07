import { ReactEntity } from 'src/entities/react.entity'
import { ReactRepository } from 'src/repositories/react.repository'
import { EmojiDto } from 'src/shared/dtos/emoji.dto'
import { MemberDto } from 'src/shared/dtos/member.dto'
import { MessageDto } from 'src/shared/dtos/message.dto'
import { DeepPartial, FindOptionsRelations, FindOptionsWhere } from 'typeorm'
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
    reactToMessage(
        emojiOfReactDto: EmojiDto,
        messageOfReactDto: MessageDto,
        authorOfReactDto: MemberDto
    ): Promise<ReactEntity>
}
