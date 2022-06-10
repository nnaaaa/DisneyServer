import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MesssageEntity } from './message.entity'
import { UserEntity } from './user.entity'
import { UserJoinChannelEntity } from './userJoinChannel.entity'

@Entity()
export class ChannelEntity {
  @PrimaryGeneratedColumn('uuid')
  channelId: string

  @OneToMany(() => MesssageEntity, (type) => type.channel)
  messages: MesssageEntity[]

  @OneToMany(() => UserJoinChannelEntity, (type) => type.user)
  members: UserEntity[]
}
