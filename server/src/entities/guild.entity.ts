import { Constant } from 'src/shared/constant'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ChannelCategoryEntity } from './channelCategory.entity'
import { RoleEntity } from './role.entity'
import { GuildMemberEntity } from './guildMember.entity'

@Entity()
export class GuildEntity {
    @PrimaryGeneratedColumn('uuid')
    guildId: string

    @Column()
    name: string

    @Column({ default: Constant.defaultGuildAvatar })
    avatarUrl: string

    /** @relationship */
    @OneToMany(() => GuildMemberEntity, (type) => type.guild, { cascade: true })
    members: GuildMemberEntity[]

    @OneToMany(() => RoleEntity, (type) => type.guild, { cascade: true })
    roles: RoleEntity[]

    @OneToMany(() => ChannelCategoryEntity, (type) => type.guild, {
        cascade: true,
    })
    categories: ChannelCategoryEntity[]
}
