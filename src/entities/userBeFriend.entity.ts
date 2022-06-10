import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { UserEntity } from './user.entity'

export enum FriendStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

@Entity()
export class UserBeFriendEntity {
  @PrimaryColumn('varchar')
  id: string

  @ManyToOne(() => UserEntity, (user) => user.friends)
  leftUser: UserEntity

  @ManyToOne(() => UserEntity, (user) => user.friends)
  rightUser: UserEntity

  @Column({ type: 'enum', enum: FriendStatus, default: FriendStatus.PENDING })
  status: FriendStatus
}
