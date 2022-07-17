import { Constant } from 'src/shared/utils/constant'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ChannelCategoryEntity } from './channelCategory.entity'
import { RoleEntity } from './role.entity'
import { MemberEntity } from './member.entity'
import { EmojiEntity } from './emoji.entity'

@Entity()
export class GuildEntity {
    @PrimaryGeneratedColumn('uuid')
    guildId: string

    @Column()
    name: string

    @Column({ default: Constant.guildAvatar })
    avatarUrl: string

    /** @relationship */
    @OneToMany(() => MemberEntity, (type) => type.guild, { cascade: true })
    members: MemberEntity[]

    @OneToMany(() => RoleEntity, (type) => type.guild, { cascade: true })
    roles: RoleEntity[]

    @OneToMany(() => EmojiEntity, (type) => type.guild, { cascade: true })
    emojis: EmojiEntity[]

    @OneToMany(() => ChannelCategoryEntity, (type) => type.guild, {
        cascade: true,
    })
    categories: ChannelCategoryEntity[]
}
