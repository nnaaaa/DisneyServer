import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AbstractEntity } from './abstract.entity'
import { MesssageEntity } from './message.entity'
import { UserBeFriendEntity } from './userBeFriend.entity'
import { UserJoinChannelEntity } from './userJoinChannel.entity'
import { UserJoinGuildEntity } from './userJoinGuild.entity'

@Entity('user')
export class UserEntity extends AbstractEntity<UserEntity>{
  @PrimaryGeneratedColumn('uuid')
  userId: string

  @Column({ unique: true })
  account: string

  @Column()
  name: string

  @Column({
    default:
      'https://i.pinimg.com/474x/7c/8f/47/7c8f476123d28d103efe381543274c25.jpg',
  })
  avatarUrl: string

  @CreateDateColumn()
  lastLogin: Date

  @Column({ default: true, type: 'bool' })
  isOnline: boolean


  /**
   * @exclude fields can't be send to client have to slice
   * **/
  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column({ default: null })
  refreshToken: string

  @Exclude()
  @Column({ type: 'bigint', nullable: true })
  registerVerifyCode: number

  @Exclude()
  @Column({ type: 'bigint', nullable: true })
  changePwdVerfiyCode: number


  /**
   * @relationship 
   * **/
  @OneToMany(
    () => UserBeFriendEntity,
    (beFriend) => beFriend.leftUser || beFriend.rightUser
  )
  friends: UserBeFriendEntity[]

  @OneToMany(() => MesssageEntity, (type) => type.sender)
  sentMessages: MesssageEntity[]

  @OneToMany(() => UserJoinChannelEntity, (type) => type.user)
  joinedChannels: UserJoinChannelEntity[]

  @OneToMany(() => UserJoinGuildEntity, (type) => type.user)
  joinedGuilds: UserJoinGuildEntity[]
}
