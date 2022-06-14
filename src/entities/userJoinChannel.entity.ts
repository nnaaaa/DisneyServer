import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { UserEntity } from './user.entity'

@Entity()
export class UserJoinChannelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  joinAt: Date

  /** @relationship */
  @ManyToOne(() => UserEntity, (type) => type.joinedChannels, {
    onDelete: 'CASCADE',
  })
  user: string

  @ManyToOne(() => ChannelEntity, (type) => type.members, {
    onDelete: 'CASCADE',
  })
  channel: string
}
