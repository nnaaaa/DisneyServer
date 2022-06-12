import {
  Column,
  Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ChannelCategoryEntity } from './channelCategory.entity'
import { MesssageEntity } from './message.entity'
import { UserEntity } from './user.entity'
import { UserJoinChannelEntity } from './userJoinChannel.entity'

@Entity()
export class ChannelEntity {
  @PrimaryGeneratedColumn('uuid')
  channelId: string

  @Column()
  name: string

  /** @relationship */
  @OneToMany(() => MesssageEntity, (type) => type.channel)
  messages: MesssageEntity[]

  @OneToMany(() => UserJoinChannelEntity, (type) => type.user)
  members: UserEntity[]

  @ManyToOne(() => ChannelCategoryEntity,type=>type.channels)
  category: ChannelCategoryEntity
}
