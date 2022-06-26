import { AbstractEntity } from './abstract.entity';
import { MesssageEntity } from './message.entity';
import { UserBeFriendEntity } from './userBeFriend.entity';
import { GuildMemberEntity } from './guildMember.entity';
export declare class UserEntity extends AbstractEntity<UserEntity> {
    userId: string;
    account: string;
    name: string;
    avatarUrl: string;
    lastLogin: Date;
    isOnline: boolean;
    password: string;
    refreshToken: string;
    registerVerifyCode: number;
    changePwdVerfiyCode: number;
    friends: UserBeFriendEntity[];
    sentMessages: MesssageEntity[];
    joinedGuilds: GuildMemberEntity[];
}
