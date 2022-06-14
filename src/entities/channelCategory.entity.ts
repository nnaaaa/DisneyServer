import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { GuildEntity } from './guild.entity'

@Entity()
export class ChannelCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string

  @Column()
  name: string

  /** @relationship */
  @ManyToOne(() => GuildEntity, (type) => type.categories, {
    onDelete: 'CASCADE',
  })
  guild: GuildEntity

  @OneToMany(() => ChannelEntity, (type) => type.category, { cascade: true })
  channels: ChannelEntity[]
}
