import { GuildDefault } from 'src/shared/guild.default'
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { GuildEntity } from './guild.entity'
import { GuildMemberEntity } from './guildMember.entity'

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    roleId: string

    @Column()
    name: string

    @Column({ nullable: true })
    icon: string

    @Column({ default: GuildDefault.roleColor })
    color: string

    /** @relationship */
    @ManyToOne(() => GuildEntity, (type) => type.roles)
    guild: GuildEntity

    @ManyToMany(() => GuildMemberEntity, (type) => type.roles)
    members: GuildMemberEntity[]

    @ManyToMany(() => ChannelEntity, (type) => type.roles)
    channels: ChannelEntity[]
}
