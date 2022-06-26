import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { GuildEntity } from './guild.entity'
import { RoleEntity } from './role.entity'
import { UserEntity } from './user.entity'

@Entity()
export class GuildMemberEntity {
    @PrimaryGeneratedColumn('uuid')
    guildMemberId: string

    @CreateDateColumn()
    joinAt: Date

    @Column()
    nickname: string

    @Column({ nullable: true })
    avatarUrl: string

    /** @relationship */
    @ManyToOne(() => UserEntity, (type) => type.joinedGuilds, {
        onDelete: 'CASCADE',
    })
    user: UserEntity

    @ManyToOne(() => GuildEntity, (type) => type.members)
    guild: GuildEntity

    @ManyToMany(() => RoleEntity, (type) => type.members, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @JoinTable()
    roles: RoleEntity[]

    @ManyToMany(() => ChannelEntity, (type) => type.members)
    joinedChannels: ChannelEntity[]
}
