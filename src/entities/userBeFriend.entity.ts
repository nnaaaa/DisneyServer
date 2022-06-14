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

  @Column({ type: 'enum', enum: FriendStatus, default: FriendStatus.PENDING })
  status: FriendStatus

  /** @relationship */
  @ManyToOne(() => UserEntity, (user) => user.friends, { onDelete: 'CASCADE' })
  leftUser: UserEntity

  @ManyToOne(() => UserEntity, (user) => user.friends, { onDelete: 'CASCADE' })
  rightUser: UserEntity
}
