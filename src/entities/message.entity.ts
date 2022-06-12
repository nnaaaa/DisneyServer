import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ChannelEntity } from './channel.entity'
import { UserEntity } from './user.entity'

@Entity()
export class MesssageEntity {
  @PrimaryGeneratedColumn('uuid')
  messageId: string

  @Column()
  content: string

  @Column({ type: 'simple-array' })
  images: string[]

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date

  /** @relationship */
  @ManyToOne(() => ChannelEntity, (type) => type.messages)
  channel: ChannelEntity

  @ManyToOne(() => UserEntity, (type) => type.sentMessages)
  sender: UserEntity

  /** @unidirection */
  @OneToOne(() => MesssageEntity)
  replyTo: MesssageEntity

  
}
