import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { UserEntity } from './user.entity'

@Entity()
export class MesssageEntity {
    @PrimaryGeneratedColumn('uuid')
    messageId: string

    @Column()
    content: string

    @Column({ type: 'simple-array' })
    images: string[]

    @CreateDateColumn()
    createAt: Date

    /** @relationship */
    @ManyToOne(() => ChannelEntity, (type) => type.messages, {
        onDelete: 'CASCADE',
    })
    channel: ChannelEntity

    @ManyToOne(() => UserEntity, (type) => type.sentMessages, {
        onDelete: 'CASCADE',
    })
    author: UserEntity

    /** @unidirection */
    @OneToOne(() => MesssageEntity, { cascade: true,nullable:true })
    replyTo: MesssageEntity
}
