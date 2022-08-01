import { Constant } from 'src/shared/utils/constant'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CommandEntity } from './command.entity'
import { MemberEntity } from './member.entity'
import { Permission } from './role.entity'
import { UserEntity } from './user.entity'

@Entity()
export class BotEntity {
    @PrimaryGeneratedColumn('uuid')
    botId: string

    @Column({ default: Constant.botAvatar })
    avatarUrl: string

    @Column({ unique: true })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({ default: '' })
    secretKey: string

    @Column({ default: false, type: 'bool' })
    isListening: boolean

    /** @relationship */
    @ManyToOne(() => UserEntity, (type) => type.createdBots)
    author: UserEntity

    @OneToMany(() => MemberEntity, (type) => type.bot, { cascade: true })
    joinedGuilds: MemberEntity[]

    @OneToMany(() => CommandEntity, (type) => type.bot, { cascade: true })
    commands: CommandEntity[]

    @Column({ type: 'simple-array' })
    requiredPermissions: Permission[]
}
