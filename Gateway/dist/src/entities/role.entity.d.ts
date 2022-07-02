import { ChannelEntity } from './channel.entity';
import { GuildEntity } from './guild.entity';
import { MemberEntity } from './member.entity';
export declare class RoleEntity {
    roleId: string;
    name: string;
    icon: string;
    color: string;
    guild: GuildEntity;
    members: MemberEntity[];
    channels: ChannelEntity[];
}
