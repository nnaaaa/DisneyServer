import { ChannelCategoryEntity } from './channelCategory.entity';
import { MesssageEntity } from './message.entity';
import { RoleEntity } from './role.entity';
import { GuildMemberEntity } from './guildMember.entity';
export declare class ChannelEntity {
    channelId: string;
    name: string;
    isPrivate: boolean;
    messages: MesssageEntity[];
    members: GuildMemberEntity[];
    category: ChannelCategoryEntity;
    roles: RoleEntity[];
}
