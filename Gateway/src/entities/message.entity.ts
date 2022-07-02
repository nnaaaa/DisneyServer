import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { MemberEntity } from './member.entity'
import { ReactEntity } from './react.entity'

@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    messageId: string

    @Column()
    content: string

    @Column({ type: 'simple-array' })
    images: string[]

    @CreateDateColumn()
    createdAt: Date

    /** @relationship */
    @ManyToOne(() => ChannelEntity, (type) => type.messages)
    channel: ChannelEntity

    @ManyToOne(() => MemberEntity, (type) => type.sentMessages)
    author: MemberEntity

    @OneToMany(() => ReactEntity, (type) => type.message, { cascade: true })
    reacts: ReactEntity[]

    /** @unidirection */
    @OneToOne(() => MessageEntity, { cascade: true, nullable: true })
    replyTo: MessageEntity
}
