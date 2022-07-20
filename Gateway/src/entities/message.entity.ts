import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { ActionEntity } from './action.entity'
import { ChannelEntity } from './channel.entity'
import { MemberEntity } from './member.entity'

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

    @UpdateDateColumn()
    updatedAt: Date

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
