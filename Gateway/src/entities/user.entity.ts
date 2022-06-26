import { GuildDefault } from 'src/shared/guild.default'
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { AbstractEntity } from './abstract.entity'
import { ChannelEntity } from './channel.entity'
import { MesssageEntity } from './message.entity'
import { UserBeFriendEntity } from './userBeFriend.entity'
import { GuildMemberEntity } from './guildMember.entity'

@Entity('user')
export class UserEntity extends AbstractEntity<UserEntity> {
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({ unique: true })
    account: string

    @Column()
    name: string

    @Column({ default: GuildDefault.userAvatar })
    avatarUrl: string

    @CreateDateColumn()
    lastLogin: Date

    @Column({ default: true, type: 'bool' })
    isOnline: boolean

    /**
     * @exclude fields can't be send to client have to slice
     * **/
    // @Exclude()
    @Column({ select: false })
    password: string

    // @Exclude()
    @Column({ nullable: true, select: false })
    refreshToken: string

    // @Exclude()
    @Column({ type: 'bigint', nullable: true, select: false })
    registerVerifyCode: number

    // @Exclude()
    @Column({ type: 'bigint', nullable: true, select: false })
    changePwdVerfiyCode: number

    /**
     * @relationship
     * **/
    @OneToMany(
        () => UserBeFriendEntity,
        (beFriend) => beFriend.leftUser || beFriend.rightUser,
        { cascade: true }
    )
    friends: UserBeFriendEntity[]

    @OneToMany(() => MesssageEntity, (type) => type.sender, { cascade: true })
    sentMessages: MesssageEntity[]

    @OneToMany(() => GuildMemberEntity, (type) => type.user, { cascade: true })
    joinedGuilds: GuildMemberEntity[]
}
