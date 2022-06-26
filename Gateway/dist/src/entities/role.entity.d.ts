import { ChannelEntity } from './channel.entity';
import { GuildEntity } from './guild.entity';
import { GuildMemberEntity } from './guildMember.entity';
export declare class RoleEntity {
    roleId: string;
    name: string;
    icon: string;
    color: string;
    guild: GuildEntity;
    members: GuildMemberEntity[];
    channels: ChannelEntity[];
}
