import {
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

  /** @relationship */
  @ManyToOne(() => UserEntity, (type) => type.joinedChannels)
  user: string

  @ManyToOne(() => GuildEntity, (type) => type.members)
  guild: string
}
