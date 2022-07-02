import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ChannelCategoryEntity } from './channelCategory.entity'
import { MessageEntity } from './message.entity'
import { RoleEntity } from './role.entity'
import { UserEntity } from './user.entity'
import { MemberEntity } from './member.entity'

@Entity()
export class ChannelEntity {
    @PrimaryGeneratedColumn('uuid')
    channelId: string

    @Column()
    name: string

    @Column({ default: false, type: 'bool' })
    isPrivate: boolean

    /** @relationship */
    @OneToMany(() => MessageEntity, (type) => type.channel, { cascade: true })
    messages: MessageEntity[]

    @ManyToMany(() => MemberEntity, (type) => type.joinedChannels, {
        cascade: true,
    })
    @JoinTable()
    members: MemberEntity[]

    @ManyToOne(() => ChannelCategoryEntity, (type) => type.channels)
    category: ChannelCategoryEntity

    @ManyToMany(() => RoleEntity, (type) => type.channels, { cascade: true })
    @JoinTable()
    roles: RoleEntity[]
}
