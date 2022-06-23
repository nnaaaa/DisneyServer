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
import { MesssageEntity } from './message.entity'
import { RoleEntity } from './role.entity'
import { UserEntity } from './user.entity'
import { GuildMemberEntity } from './guildMember.entity'

@Entity()
export class ChannelEntity {
    @PrimaryGeneratedColumn('uuid')
    channelId: string

    @Column()
    name: string

    @Column({ default: false, type: 'bool' })
    isPrivate: boolean

    /** @relationship */
    @OneToMany(() => MesssageEntity, (type) => type.channel, { cascade: true })
    messages: MesssageEntity[]

    @ManyToMany(() => GuildMemberEntity, (type) => type.joinedChannels, {
        cascade: true,
    })
    @JoinTable()
    members: GuildMemberEntity[]

    @ManyToOne(() => ChannelCategoryEntity, (type) => type.channels)
    category: ChannelCategoryEntity

    @ManyToMany(() => RoleEntity, (type) => type.channels, { cascade: true })
    @JoinTable()
    roles: RoleEntity[]
}
