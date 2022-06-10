import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { MesssageEntity } from './message.entity'
import { UserBeFriendEntity } from './userBeFriend.entity'
import { UserJoinChannelEntity } from './userJoinChannel.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string

  @Column({ unique: true })
  account: string

  @Column()
  password: string

  @Column()
  name: string

  @Column({
    default:
      'https://i.pinimg.com/474x/7c/8f/47/7c8f476123d28d103efe381543274c25.jpg',
  })
  avatarUrl: string

  @Column({ default: null })
  refreshToken: string

  @CreateDateColumn()
  lastLogin: Date

  @Column({ default: true, type: 'bool' })
  isOnline: boolean

  @OneToMany(
    () => UserBeFriendEntity,
    (beFriend) => beFriend.leftUser || beFriend.rightUser
  )
  friends: UserBeFriendEntity[]

  @OneToMany(() => MesssageEntity, (type) => type.sender)
  sentMessages: MesssageEntity[]

  @OneToMany(() => UserJoinChannelEntity, (type) => type.user)
  joinedChannels: UserJoinChannelEntity[]
}
