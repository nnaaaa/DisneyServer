import { Default } from 'src/shared/default'
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
import { MemberEntity } from './member.entity'

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    roleId: string

    @Column()
    name: string

    @Column({ nullable: true })
    icon: string

    @Column({ default: Default.roleColor })
    color: string

    /** @relationship */
    @ManyToOne(() => GuildEntity, (type) => type.roles)
    guild: GuildEntity

    @ManyToMany(() => MemberEntity, (type) => type.roles)
    members: MemberEntity[]

    @ManyToMany(() => ChannelEntity, (type) => type.roles)
    channels: ChannelEntity[]
}
