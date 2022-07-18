import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ActionEntity } from './action.entity'
import { ChannelEntity } from './channel.entity'
import { MemberEntity } from './member.entity'
import { ReactEntity } from './react.entity'

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    messageId: string

    @Column({ type: 'text' })
    content: string

    @Column({ type: 'simple-array' })
    images: string[]

    @CreateDateColumn()
    createdAt: Date

    /** @relationship */
    @OneToOne(() => ActionEntity, (type) => type.message)
    @JoinColumn()
    action: ActionEntity

    @ManyToOne(() => ChannelEntity, (type) => type.messages)
    channel: ChannelEntity

    @ManyToOne(() => MemberEntity, (type) => type.sentMessages)
    author: MemberEntity

    /** @selfrelation */
    @ManyToOne(() => MessageEntity, (type) => type.replies, { nullable: true })
    // @JoinTable({ joinColumn: { name: 'messageId' } })
    replyTo: MessageEntity

    @OneToMany(() => MessageEntity, (type) => type.replyTo, { cascade: true })
    replies: MessageEntity[]
}
