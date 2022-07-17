import { Constant } from 'src/shared/utils/constant'
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

export type Permission =
    | 'DELETE_GUILD'
    | 'UPDATE_GUILD'
    | 'DELETE_CHANNEL'
    | 'UPDATE_CHANNEL'
    | 'CREATE_CHANNEL'
    | 'CREATE_ROLE'
    | 'UPDATE_ROLE'
    | 'DELETE_ROLE'
    | 'CREATE_EMOJI'
    | 'UPDATE_EMOJI'
    | 'DELETE_EMOJI'
    | 'CREATE_MESSAGE'
    | 'UPDATE_MESSAGE'
    | 'DELETE_MESSAGE'
    | 'CUD_REACT'

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    roleId: string

    @Column()
    name: string

    @Column({ nullable: true })
    icon?: string

    @Column({ default: Constant.roleColor })
    color: string

    /** @relationship */
    @ManyToOne(() => GuildEntity, (type) => type.roles)
    guild: GuildEntity

    @ManyToMany(() => MemberEntity, (type) => type.roles)
    members: MemberEntity[]

    @ManyToMany(() => ChannelEntity, (type) => type.roles)
    channels: ChannelEntity[]

    @Column({ type: 'simple-array' })
    permissions: Permission[]
}
