import { MemberEntity } from './member.entity';
import { UserBeFriendEntity } from './userBeFriend.entity';
export declare class UserEntity {
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
    joinedGuilds: MemberEntity[];
    createdBots: MemberEntity[];
}
