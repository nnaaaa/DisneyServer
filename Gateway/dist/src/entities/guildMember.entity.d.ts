import { ChannelEntity } from './channel.entity';
import { GuildEntity } from './guild.entity';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';
export declare class GuildMemberEntity {
    guildMemberId: string;
    joinAt: Date;
    nickname: string;
    avatarUrl: string;
    user: UserEntity;
    guild: GuildEntity;
    roles: RoleEntity[];
    joinedChannels: ChannelEntity[];
}
