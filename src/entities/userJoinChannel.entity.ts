import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { MesssageEntity } from './message.entity'
import { UserEntity } from './user.entity'

@Entity()
export class UserJoinChannelEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: string
  @PrimaryColumn()
  @ManyToOne(() => UserEntity, (type) => type.joinedChannels)
  user: string

  @PrimaryColumn()
  @ManyToOne(() => ChannelEntity, (type) => type.members)
  channel: string

  @CreateDateColumn()
  joinAt: Date
}
