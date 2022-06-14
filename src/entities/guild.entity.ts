import { Constant } from 'src/shared/constant'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ChannelCategoryEntity } from './channelCategory.entity'
import { UserJoinGuildEntity } from './userJoinGuild.entity'

@Entity()
export class GuildEntity {
  @PrimaryGeneratedColumn('uuid')
  guildId: string

  @Column()
  name: string

  @Column({ default: Constant.defaultGuildAvatar })
  avatarUrl: string

  /** @relationship */
  @OneToMany(() => UserJoinGuildEntity, (type) => type.guild, { cascade: true })
  members: UserJoinGuildEntity[]

  @OneToMany(() => ChannelCategoryEntity, (type) => type.guild, { cascade: true })
  categories: ChannelCategoryEntity[]
}
