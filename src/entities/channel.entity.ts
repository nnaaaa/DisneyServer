import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ChannelCategoryEntity } from './channelCategory.entity'
import { MesssageEntity } from './message.entity'
import { UserJoinChannelEntity } from './userJoinChannel.entity'

@Entity()
export class ChannelEntity {
  @PrimaryGeneratedColumn('uuid')
  channelId: string

  @Column()
  name: string

  /** @relationship */
  @OneToMany(() => MesssageEntity, (type) => type.channel, { cascade: true })
  messages: MesssageEntity[]

  @OneToMany(() => UserJoinChannelEntity, (type) => type.user, { cascade: true })
  members: UserJoinChannelEntity[]

  @ManyToOne(() => ChannelCategoryEntity, (type) => type.channels, {
    onDelete: 'CASCADE',
  })
  category: ChannelCategoryEntity
}
