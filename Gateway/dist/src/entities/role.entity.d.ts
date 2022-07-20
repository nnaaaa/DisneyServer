import { ChannelEntity } from './channel.entity';
import { GuildEntity } from './guild.entity';
import { MemberEntity } from './member.entity';
export declare type Permission = 'DELETE_GUILD' | 'UPDATE_GUILD' | 'DELETE_CHANNEL' | 'UPDATE_CHANNEL' | 'CREATE_CHANNEL' | 'CREATE_ROLE' | 'UPDATE_ROLE' | 'DELETE_ROLE' | 'CREATE_EMOJI' | 'UPDATE_EMOJI' | 'DELETE_EMOJI' | 'CREATE_MESSAGE' | 'UPDATE_MESSAGE' | 'DELETE_MESSAGE' | 'CUD_REACT';
export declare class RoleEntity {
    roleId: string;
    name: string;
    icon?: string;
    color: string;
    guild: GuildEntity;
    members: MemberEntity[];
    channels: ChannelEntity[];
    permissions: Permission[];
}
