import { Default } from 'src/shared/default'
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { GuildMemberEntity } from './guildMember.entity'
import { MesssageEntity } from './message.entity'
import { UserBeFriendEntity } from './userBeFriend.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({ unique: true })
    account: string

    @Column()
    name: string

    @Column({ default: Default.userAvatar })
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

    @OneToMany(() => MesssageEntity, (type) => type.author, { cascade: true })
    sentMessages: MesssageEntity[]

    @OneToMany(() => GuildMemberEntity, (type) => type.user, { cascade: true })
    joinedGuilds: GuildMemberEntity[]
}
