import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { GuildEntity } from './guild.entity'

@Entity()
export class ChannelCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string

  /** @relationship */
  @ManyToOne(() => GuildEntity, (type) => type.categories)
  guild: GuildEntity

  @OneToMany(() => ChannelEntity, (type) => type.category)
  channels: ChannelEntity[]
}
