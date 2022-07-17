import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ActionEntity } from './action.entity'
import { EmojiEntity } from './emoji.entity'
import { MemberEntity } from './member.entity'

@Entity()
export class ReactEntity {
    @PrimaryGeneratedColumn('uuid')
    reactId: string

    @ManyToOne(() => MemberEntity, (type) => type.sentReacts)
    author: MemberEntity

    @ManyToOne(() => ActionEntity, (type) => type.reacts)
    action: ActionEntity

    @ManyToOne(() => EmojiEntity, (type) => type.reacts)
    emoji: EmojiEntity
}
