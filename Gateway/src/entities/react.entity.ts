import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { EmojiEntity } from './emoji.entity'
import { MemberEntity } from './member.entity'
import { MessageEntity } from './message.entity'

@Entity()
export class ReactEntity {
    @PrimaryGeneratedColumn('uuid')
    reactId: string

    @ManyToOne(() => MemberEntity, (type) => type.sentReacts)
    author: MemberEntity

    @ManyToOne(() => MessageEntity, (type) => type.reacts)
    message: MessageEntity

    @ManyToOne(() => EmojiEntity, (type) => type.reacts)
    emoji: EmojiEntity
}
