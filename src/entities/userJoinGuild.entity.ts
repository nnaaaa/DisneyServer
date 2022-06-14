import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { GuildEntity } from './guild.entity'
import { UserEntity } from './user.entity'

@Entity()
export class UserJoinGuildEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  joinAt: Date

  @Column()
  nickname: string

  @Column({ nullable: true })
  avatarUrl: string

  /** @relationship */
  @ManyToOne(() => UserEntity, (type) => type.joinedGuilds, {
    onDelete: 'CASCADE',
  })
  user: UserEntity

  @ManyToOne(() => GuildEntity, (type) => type.members, {
    onDelete: 'CASCADE'
  })
  guild: GuildEntity
}
